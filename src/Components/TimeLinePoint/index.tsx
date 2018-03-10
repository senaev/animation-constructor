import * as React from 'react';
import { Cursor } from '../../Cursor/Cursor';
import { DragListener, DragPosition } from '../../utils/DragListener';
import { noop } from '../../utils/noop';
import { subscribeHoverChange } from '../../utils/subscribeHoverChange';
import * as c from './index.pcss';

type TimeLinePointCallbacks = {
    onPositionChangeStart: (dragPosition: DragPosition) => void;
    onPositionChange: (dragPosition: DragPosition) => void;
    onPositionChangeEnd: (dragPosition: DragPosition) => void;
};

export type TimeLinePointProps =
    & {
        position: number;
        movable: boolean;
    }
    & Partial<TimeLinePointCallbacks>;

export type TimeLinePointState = {
    isHovered: boolean;
    isDragging: boolean;
};

export class TimeLinePoint extends React.Component<TimeLinePointProps, TimeLinePointState> {
    private containerElement?: HTMLDivElement | null;

    private unsubscribeHoverChange = noop;
    private cursorDragListener?: DragListener;

    constructor(props: TimeLinePointProps) {
        super(props);

        this.state = {
            isHovered: false,
            isDragging: false,
        };
    }

    public render() {
        const {
            // isHovered,
            isDragging,
        } = this.state;

        const {
            position,
            movable,
        } = this.props;

        return <div
            ref={ (element) => {
                this.containerElement = element;
            } }
            className={ c.TimeLinePoint }
            style={ {
                left: `${position * 100}%`,
                cursor: movable ?
                    isDragging
                        ? Cursor.grabbing
                        : Cursor.grab
                    : Cursor.default,
            } }
        >
            <div className={ c.TimeLinePoint__pointer }/>
            <div
                className={ c.TimeLinePoint__hoverZone }
                style={ {
                    cursor: movable
                        ? Cursor.grab
                        : Cursor.default,
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
            movable,
            onPositionChangeStart = noop,
            onPositionChange = noop,
            onPositionChangeEnd = noop,
        } = this.props;

        if (movable) {
            this.cursorDragListener = new DragListener(containerElement, {
                onStart: (dragPosition) => {
                    this.setState({ isDragging: true });
                    onPositionChangeStart(dragPosition);
                },
                onMove: (dragPosition) => {
                    onPositionChange(dragPosition);
                },
                onEnd: (dragPosition) => {
                    this.setState({ isDragging: false });
                    onPositionChangeEnd(dragPosition);
                },
            });
        }
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
