import * as React from 'react';
import { Cursor } from '../../../Cursor/Cursor';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { clamp } from '../../../utils/clamp';
import { DragListener, DragPosition } from '../../../utils/DragListener';
import { noop } from '../../../utils/noop';
import { subscribeHoverChange } from '../../../utils/subscribeHoverChange';
import { TimeLinePointTooltip } from '../TimeLinePointTooltip';
import * as c from './index.pcss';

type TimeLinePointCallbacks = {
    onPositionChangeStart: (position: number) => void;
    onPositionChange: (position: number) => void;
    onPositionChangeEnd: (position: number) => void;
};

export type TimeLinePointMovableParams = {
    min: number;
    max: number;
};

export type TimeLinePointChangeableParams<T extends Unit> = {
    unit: T;
    title: string;
    value: UnitTypes[T];
    onChange: (value: UnitTypes[T]) => void;
};

export type TimeLinePointProps<T extends Unit> =
    & {
        position: number;
        containerWidth: UnitTypes[Unit.pixel];
        movable?: TimeLinePointMovableParams;
        changeable?: TimeLinePointChangeableParams<T>;
    }
    & Partial<TimeLinePointCallbacks>;

export type TimeLinePointState = {
    isHovered: boolean;
    isChangeableDialogOpened: boolean;
    draggingStartPosition: number | undefined;
};

export class TimeLinePoint<T extends Unit> extends React.Component<TimeLinePointProps<T>, TimeLinePointState> {
    private containerElement?: HTMLDivElement | null;
    private dragElement?: HTMLDivElement | null;

    private unsubscribeHoverChange = noop;
    private cursorDragListener?: DragListener;

    constructor(props: TimeLinePointProps<T>) {
        super(props);

        this.state = {
            isHovered: false,
            isChangeableDialogOpened: false,
            draggingStartPosition: undefined,
        };
    }

    public render() {
        const {
            isHovered,
            isChangeableDialogOpened,
            draggingStartPosition,
        } = this.state;

        const {
            position,
            movable,
            changeable,
        } = this.props;

        return <div
            ref={ (element) => {
                this.containerElement = element;
            } }
            className={ c.TimeLinePoint }
            style={ {
                left: `${position * 100}%`,
                cursor: movable ?
                    draggingStartPosition === undefined
                        ? Cursor.grab
                        : Cursor.grabbing
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
                ref={ (element) => {
                    this.dragElement = element;
                } }
            />
            {
                isHovered && draggingStartPosition === undefined || isChangeableDialogOpened
                    ? <TimeLinePointTooltip
                        changeable={ changeable }
                        isChangeableDialogOpen={ isChangeableDialogOpened }
                        requestChangeableDialogOpened={ this.requestChangeableDialogOpened }
                    />
                    : null
            }
        </div>;
    }

    public componentDidMount() {
        const {
            containerElement,
            dragElement,
        } = this;

        if (!containerElement || !dragElement) {
            throw new Error('One of elements has not been initialized');
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
            this.cursorDragListener = new DragListener(dragElement, {
                onStart: (dragPosition) => {
                    this.setState({ draggingStartPosition: this.props.position });
                    onPositionChangeStart(this.getPositionByPixelOffset(dragPosition));
                },
                onMove: (dragPosition) => {
                    onPositionChange(this.getPositionByPixelOffset(dragPosition));
                },
                onEnd: (dragPosition) => {
                    onPositionChangeEnd(this.getPositionByPixelOffset(dragPosition));
                    this.setState({ draggingStartPosition: undefined });
                },
            });
        }
    }

    public componentWillUnmount() {
        this.unsubscribeHoverChange();

        const { cursorDragListener } = this;

        if (cursorDragListener !== undefined) {
            cursorDragListener.destroy();
        }
    }

    private getPositionByPixelOffset({ relativeX }: DragPosition): number {
        const {
            containerWidth,
            movable,
        } = this.props;

        if (movable === undefined) {
            throw new Error('Point should not be moved');
        }

        const {
            draggingStartPosition,
        } = this.state;

        if (draggingStartPosition === undefined) {
            throw new Error('draggingStartPosition is not set');
        }

        const { min, max } = movable;

        return clamp(draggingStartPosition + relativeX / containerWidth, min, max);
    }

    private requestChangeableDialogOpened = (opened: boolean) => {
        this.setState({ isChangeableDialogOpened: opened });
    }
}
