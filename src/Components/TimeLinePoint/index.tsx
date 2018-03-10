import * as React from 'react';
import { DragListener, DragPosition } from '../../utils/DragListener';
import { noop } from '../../utils/noop';
import { subscribeHoverChange } from '../../utils/subscribeHoverChange';
import { ConstructorState } from '../../Store/State';
import * as c from './index.pcss';

type TimeLinePointCallbacks = {
    onPositionChangeStart: (dragPosition: DragPosition) => void;
    onPositionChange: (dragPosition: DragPosition) => void;
    onPositionChangeEnd: (dragPosition: DragPosition) => void;
};

export type TimeLinePointProps =
    & {
        position: ConstructorState['animationPosition'];
    }
    & Partial<TimeLinePointCallbacks>;

export type TimeLinePointState = {
    isHovered: boolean;
    isDraggedCursor: boolean;
};

export class TimeLinePoint extends React.Component<TimeLinePointProps, TimeLinePointState> {
    private containerElement?: HTMLDivElement | null;

    private unsubscribeHoverChange = noop;
    private cursorDragListener?: DragListener;

    constructor(props: TimeLinePointProps) {
        super(props);

        this.state = {
            isHovered: false,
            isDraggedCursor: false,
        };
    }

    public render() {
        const {
            isHovered,
            isDraggedCursor,
        } = this.state;
        const { position } = this.props;

        return <div
            ref={ (element) => {
                this.containerElement = element;
            } }
            className={ c.TimeLinePoint }
            style={ {
                left: `${position * 100}%`,
                cursor: isDraggedCursor ? '-webkit-grabbing' : '-webkit-grab',
            } }
        >
            <div className={ c.TimeLinePoint__pointer }/>
            <div className={ c.TimeLinePoint__hoverZone }/>
            <div
                className={ c.TimeLinePoint__cursor }
                style={ {
                    display: isHovered || isDraggedCursor ? 'block' : 'none',
                } }
            />
        </div>;
    }

    public componentDidMount() {
        const { containerElement } = this;

        if (!containerElement) {
            throw new Error('Container element has not been initialized');
        }

        this.unsubscribeHoverChange = subscribeHoverChange(containerElement, (isHovered) => {
            this.setState({ isHovered });
        });

        const {
            onPositionChangeStart = noop,
            onPositionChange = noop,
            onPositionChangeEnd = noop,
        } = this.props;

        this.cursorDragListener = new DragListener(containerElement, {
            onStart: (dragPosition) => {
                this.setState({ isDraggedCursor: true });
                onPositionChangeStart(dragPosition);
            },
            onMove: (dragPosition) => {
                onPositionChange(dragPosition);
            },
            onEnd: (dragPosition) => {
                this.setState({ isDraggedCursor: false });
                onPositionChangeEnd(dragPosition);
            },
        });
    }

    public componentWillUnmount() {
        this.unsubscribeHoverChange();

        const { cursorDragListener } = this;

        if (!cursorDragListener) {
            throw new Error('cursorDragListener has not been initialized');
        }

        cursorDragListener.destroy();
    }
}
