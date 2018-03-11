import * as cx from 'classnames';
import * as React from 'react';
import { Block } from '../../Block/Block';
import { blockToStyles } from '../../Block/utils/blockToStyles';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { DragListener } from '../../utils/DragListener';
import { getAngleRelativeToOrigin } from '../../utils/Trigonometry/getAngleRelativeToOrigin';
import { getRectangleSizeByPointAndAngle } from '../../utils/Trigonometry/getRectangleSizeByPointAndAngle';
import * as c from './index.pcss';

type ResizerProps = Block & {
    onResize: (newSize: Size) => void;
    onRotate: (rotation: number) => void;
    onMove: (newSize: PointCoordinates) => void;
};

type ResizerState = {
    isMoving: boolean;
};

export class Resizer extends React.Component<ResizerProps, ResizerState> {
    private element?: HTMLDivElement | null;
    private moveElement?: HTMLDivElement | null;
    private resizeElement?: HTMLDivElement | null;
    private rotationElement?: HTMLDivElement | null;

    private dragListenerForResize?: DragListener;
    private dragListenerForRotation?: DragListener;
    private dragListenerForMove?: DragListener;

    constructor(props: ResizerProps) {
        super(props);

        this.state = {
            isMoving: false,
        };
    }

    public render() {
        const {
            x,
            y,
            width,
            height,
            rotation,
        } = this.props;

        const {
            isMoving,
        } = this.state;

        const resizerStyles = blockToStyles({
            x,
            y,
            width,
            height,
            rotation,
        });

        return <div
            className={ cx(c.Resizer, {
                [c.Resizer_grabbing]: isMoving,
            }) }
            ref={ (element) => {
                this.element = element;
            } }
            style={ resizerStyles }>
            <div className={ cx(c.Resizer__dottedLine, c.Resizer__dottedLine_white) }/>
            <div className={ c.Resizer__dottedLine }/>
            <div
                className={ c.Resizer__mover }
                ref={ (element) => {
                    this.moveElement = element;
                } }/>
            <div
                className={ c.Resizer__resizeSlider }
                ref={ (element) => {
                    this.resizeElement = element;
                } }/>
            <div
                className={ c.Resizer__rotationSlider }
                ref={ (element) => {
                    this.rotationElement = element;
                } }/>
        </div>;
    }

    public componentDidMount() {
        const {
            moveElement,
            resizeElement,
            rotationElement,
        } = this;

        if (!moveElement || !resizeElement || !rotationElement) {
            throw new Error('One of elements has not been initialized');
        }

        let startBlock: Readonly<PointCoordinates>;
        this.dragListenerForMove = new DragListener(moveElement, {
            onStart: () => {
                startBlock = {
                    x: this.props.x,
                    y: this.props.y,
                };

                this.setState({
                    isMoving: true,
                });
            },
            onMove: ({ relativeX, relativeY }) => {
                const percentageInPixel = this.getPercentageInPixel();

                this.props.onMove({
                    x: startBlock.x + relativeX * percentageInPixel,
                    y: startBlock.y + relativeY * percentageInPixel,
                });
            },
            onEnd: () => {
                this.setState({
                    isMoving: false,
                });
            },
        });

        let blockOriginAbsoluteCoordinates: Readonly<PointCoordinates>;
        this.dragListenerForResize = new DragListener(resizeElement, {
            onStart: () => {
                blockOriginAbsoluteCoordinates = this.getBlockOriginAbsoluteCoordinates();
            },
            onMove: (dragPosition) => {
                const dragPositionRelativeToBlockOrigin: PointCoordinates = {
                    x: dragPosition.x - blockOriginAbsoluteCoordinates.x,
                    y: dragPosition.y - blockOriginAbsoluteCoordinates.y,
                };

                const { width, height } = getRectangleSizeByPointAndAngle(
                    dragPositionRelativeToBlockOrigin,
                    this.props.rotation,
                );

                const pixelsInPercent = this.getPixelsInPercent();
                this.props.onResize({
                    width: Math.max(0, width) / pixelsInPercent,
                    height: Math.max(0, height) / pixelsInPercent,
                });
            },
        });

        let startRotationPosition: number;
        this.dragListenerForRotation = new DragListener(rotationElement, {
            onStart: (dragPosition) => {
                const startSliderRotationPosition = this.getCursorAngleRelativeToBlockOrigin(dragPosition);
                const startBlockRotationPosition = this.props.rotation;

                startRotationPosition = startBlockRotationPosition - startSliderRotationPosition;
            },
            onMove: (dragPosition) => {
                const cursorAngle = this.getCursorAngleRelativeToBlockOrigin(dragPosition);

                this.props.onRotate(cursorAngle + startRotationPosition);
            },
        });
    }

    public componentWillUnmount() {
        const {
            dragListenerForResize,
            dragListenerForRotation,
            dragListenerForMove,
        } = this;

        if (!dragListenerForResize || !dragListenerForRotation || !dragListenerForMove) {
            throw new Error('One of drag listeners has not been initialized');
        }

        dragListenerForResize.destroy();
        dragListenerForRotation.destroy();
        dragListenerForMove.destroy();
    }

    private getBlockOriginAbsoluteCoordinates(): PointCoordinates {
        const parentRect = this.getParentBlockRect();

        const pixelsInPercent = this.getPixelsInPercent();
        return {
            x: this.props.x * pixelsInPercent + parentRect.left,
            y: this.props.y * pixelsInPercent + parentRect.top,
        };
    }

    private getCursorAngleRelativeToBlockOrigin({ x, y }: PointCoordinates): UnitTypes[Unit.degree] {
        const originCoordinates = this.getBlockOriginAbsoluteCoordinates();

        return getAngleRelativeToOrigin({
            x: x - originCoordinates.x,
            y: y - originCoordinates.y,
        });
    }

    private getParentBlockRect(): ClientRect {
        const { element } = this;

        if (!element) {
            throw new Error('Element is not defined');
        }

        const { parentElement } = element;

        if (!parentElement) {
            throw new Error('Element has no parent');
        }

        return parentElement.getBoundingClientRect();
    }

    private getPercentageInPixel(): UnitTypes[Unit.percent] {
        return 100 / this.getParentBlockRect().width;
    }

    private getPixelsInPercent(): number {
        return this.getParentBlockRect().width / 100;
    }
}
