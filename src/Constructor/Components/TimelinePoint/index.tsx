import * as React from 'react';
import { DragListener } from '../../../utils/DragListener';
import { noop } from '../../../utils/noop';
import { subscribeHoverChange } from '../../../utils/subscribeHoverChange';
import { ConstructorState } from '../../Store/State';
import * as c from './index.pcss';

export type TimelinePointProps = {
    position: ConstructorState['animationPosition'];

    onPositionChangeStart?: () => void;
    onPositionChange?: (pixelOffset: number) => void;
    onPositionChangeEnd?: () => void;
};

export type TimelinePointState = {
    isHovered: boolean;
    isDraggedCursor: boolean;
};

export class TimelinePoint extends React.Component<TimelinePointProps, TimelinePointState> {
    private containerElement: HTMLDivElement;

    private unsubscribeHoverChange = noop;
    private cursorDragListener: DragListener;

    private readonly onPositionChangeStart = noop;
    private readonly onPositionChange = noop;
    private readonly onPositionChangeEnd = noop;

    constructor(props: TimelinePointProps) {
        super(props);

        this.state = {
            isHovered: false,
            isDraggedCursor: false,
        };

        const {
            onPositionChangeStart,
            onPositionChange,
            onPositionChangeEnd,
        } = this.props;

        if (typeof onPositionChangeStart === 'function') {
            this.onPositionChangeStart = onPositionChangeStart;
        }

        if (typeof onPositionChange === 'function') {
            this.onPositionChange = onPositionChange;
        }

        if (typeof onPositionChangeEnd === 'function') {
            this.onPositionChangeEnd = onPositionChangeEnd;
        }
    }

    public render() {
        const {
            isHovered,
            isDraggedCursor,
        } = this.state;
        const { position } = this.props;

        return <div
            ref={ (element) => {
                this.containerElement = element!;
            } }
            className={ c.TimelinePoint }
            style={ {
                left: `${position * 100}%`,
                cursor: isDraggedCursor ? '-webkit-grabbing' : '-webkit-grab',
            } }
        >
            <div className={ c.TimelinePoint__pointer }/>
            <div className={ c.TimelinePoint__hoverZone }/>
            <div
                className={ c.TimelinePoint__cursor }
                style={ {
                    display: isHovered || isDraggedCursor ? 'block' : 'none',
                } }
            />
        </div>;
    }

    public componentDidMount() {
        this.unsubscribeHoverChange = subscribeHoverChange(this.containerElement, (isHovered) => {
            this.setState({ isHovered });
        });

        this.cursorDragListener = new DragListener(this.containerElement, {
            onStart: () => {
                this.setState({ isDraggedCursor: true });
                this.onPositionChangeStart();
            },
            onMove: ({ relativeX }) => {
                this.onPositionChange(relativeX);
            },
            onEnd: () => {
                this.setState({ isDraggedCursor: false });
                this.onPositionChangeEnd();
            },
        });
    }

    public componentWillUnmount() {
        this.unsubscribeHoverChange();
        this.cursorDragListener.destroy();
    }
}
