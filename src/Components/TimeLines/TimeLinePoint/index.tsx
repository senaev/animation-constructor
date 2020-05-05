import * as React from 'react';
import { Easing } from '../../../Easing/Easing';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { clamp } from '../../../utils/clamp';
import { DragListener, DragPosition } from '../../../utils/DragListener/DragListener';
import { noop } from '../../../utils/noop';
import { subscribeHoverChange } from '../../../utils/subscribeHoverChange';
import { TimeLinePointTooltip } from '../TimeLinePointTooltip';
import * as c from './index.pcss';

export type TimeLinePointMovableParams = {
    min: number;
    max: number;
};

export type TimeLinePointParams<T extends Unit> = {
    position: number;
    changingPosition: boolean;
    containerWidth: UnitTypes['pixel'];
    movable: TimeLinePointMovableParams | undefined;
    unit: T;
    value: UnitTypes[T];
    easing: Easing | undefined;
};

export type TimeLinePointCallbacks<T extends Unit> = {
    onPositionChangeStart: (position: number) => void;
    onPositionChange: (position: number) => void;
    onPositionChangeEnd: (position: number) => void;
    onRemove: (() => void) | undefined;
    onChangeValue: ((nextValue: UnitTypes[T]) => void) | undefined;
    onChangeEasing: (easing: Easing | undefined) => void;
};

export type TimeLinePointProps<T extends Unit> =
    & TimeLinePointParams<T>
    & TimeLinePointCallbacks<T>;

export type TimeLinePointState = {
    isHovered: boolean;
    isChangeableDialogOpened: boolean;
};

export class TimeLinePoint<T extends Unit>
    extends React.Component<TimeLinePointProps<T>, TimeLinePointState> {
    private containerElement?: HTMLDivElement | null;
    private dragElement?: HTMLDivElement | null;

    private unsubscribeHoverChange = noop;
    private cursorDragListener?: DragListener;

    private draggingStartPosition: number | undefined;


    constructor(props: TimeLinePointProps<T>) {
        super(props);

        this.state = {
            isHovered: false,
            isChangeableDialogOpened: false,
        };
    }

    public render() {
        const {
            isHovered,
            isChangeableDialogOpened,
        } = this.state;

        const {
            changingPosition,
            position,
            onRemove,
            movable,
            unit,
            value,
            onChangeValue,
            onPositionChange,
            easing,
            onChangeEasing,
        } = this.props;

        return <div
            ref={ (element) => {
                this.containerElement = element;
            } }
            className={ c.TimeLinePoint }
            style={ {
                left: `${position * 100}%`,
            } }
        >
            <div className={ c.TimeLinePoint__pointer }/>
            <div
                className={ c.TimeLinePoint__hoverZone }
                ref={ (element) => {
                    this.dragElement = element;
                } }
            />
            {
                changingPosition || isHovered || isChangeableDialogOpened
                    ? <TimeLinePointTooltip
                        position={ position }
                        unit={ unit }
                        value={ value }
                        onChangeValue={ onChangeValue }
                        onChangePosition={ onPositionChange }
                        onRemove={ onRemove }
                        movable={ movable }
                        requestChangeableDialogOpened={ this.requestChangeableDialogOpened }
                        easing={ easing }
                        onChangeEasing={ onChangeEasing }
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
            onPositionChangeStart,
            onPositionChange,
            onPositionChangeEnd,
        } = this.props;

        if (movable) {
            const {} = movable;

            this.cursorDragListener = new DragListener(dragElement, {
                onStart: (dragPosition) => {
                    this.draggingStartPosition = this.props.position;

                    onPositionChangeStart(this.getPositionByPixelOffset(dragPosition));
                },
                onMove: (dragPosition) => {
                    onPositionChange(this.getPositionByPixelOffset(dragPosition));
                },
                onEnd: (dragPosition) => {
                    onPositionChangeEnd(this.getPositionByPixelOffset(dragPosition));

                    this.draggingStartPosition = undefined;
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
        } = this;

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
