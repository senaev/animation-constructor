import * as cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { getFieldsValuesByPosition } from '../../Animation/util/getFieldsValuesByPosition';
import { Block } from '../../Block/Block';
import { blockToStyles } from '../../Block/utils/blockToStyles';
import { setEditedBlockFieldsOnCurrentPositionAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { DragListener } from '../../utils/DragListener';
import { getAngleRelativeToOrigin } from '../../utils/Trigonometry/getAngleRelativeToOrigin';
import { getRectangleSizeByPointAndAngle } from '../../utils/Trigonometry/getRectangleSizeByPointAndAngle';
import * as c from './index.pcss';

export type ResizerStateProps = {
    isMoving: boolean;
    block: Block;
};

export type ResizerDispatchProps = {
    setEditedBlockFieldsOnCurrentPosition: (blockFields: Partial<Block>) => void;
};

export type ResizerProps =
    & ResizerStateProps
    & ResizerDispatchProps;

class ResizerComponent extends React.Component<ResizerProps, {}> {
    private element?: HTMLDivElement | null;
    private moveElement?: HTMLDivElement | null;
    private resizeElement?: HTMLDivElement | null;
    private rotationElement?: HTMLDivElement | null;

    private dragListenerForResize?: DragListener;
    private dragListenerForRotation?: DragListener;
    private dragListenerForMove?: DragListener;

    public render() {
        const resizerStyles = {
            ...blockToStyles(this.props.block),
            display: 'block',
        };

        return <div className={ c.Resizer__container }>
            <div
                className={ c.Resizer }
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
            </div>
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

        const {
            isMoving,
        } = this.props;

        let startBlock: Readonly<PointCoordinates>;
        this.dragListenerForMove = new DragListener(
            moveElement,
            {
                onStart: () => {
                    const {
                        x,
                        y,
                    } = this.props.block;

                    startBlock = {
                        x,
                        y,
                    };

                    this.setState({
                        isMoving: true,
                    });
                },
                onMove: ({ relativeX, relativeY }) => {
                    const percentageInPixel = this.getPercentageInPixel();

                    this.onMove({
                        x: startBlock.x + relativeX * percentageInPixel,
                        y: startBlock.y + relativeY * percentageInPixel,
                    });
                },
                onEnd: () => {
                    this.setState({
                        isMoving: false,
                    });
                },
            },
            {
                draggingOnStart: isMoving,
            },
        );

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
                    this.props.block.rotation,
                );

                const pixelsInPercent = this.getPixelsInPercent();
                this.onResize({
                    width: Math.max(0, width) / pixelsInPercent,
                    height: Math.max(0, height) / pixelsInPercent,
                });
            },
        });

        let startRotationPosition: number;
        this.dragListenerForRotation = new DragListener(rotationElement, {
            onStart: (dragPosition) => {
                const startSliderRotationPosition = this.getCursorAngleRelativeToBlockOrigin(dragPosition);
                const startBlockRotationPosition = this.props.block.rotation;

                startRotationPosition = startBlockRotationPosition - startSliderRotationPosition;
            },
            onMove: (dragPosition) => {
                const cursorAngle = this.getCursorAngleRelativeToBlockOrigin(dragPosition);

                this.onRotate(cursorAngle + startRotationPosition);
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
        const {
            x,
            y,
        } = this.props.block;

        return {
            x: x * pixelsInPercent + parentRect.left,
            y: y * pixelsInPercent + parentRect.top,
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

    private onResize = (blockSize: Size) => {
        this.props.setEditedBlockFieldsOnCurrentPosition(blockSize);
    }

    private onRotate = (rotation: UnitTypes[Unit.degree]) => {
        this.props.setEditedBlockFieldsOnCurrentPosition({ rotation });
    }

    private onMove = (pointCoordinates: PointCoordinates) => {
        this.props.setEditedBlockFieldsOnCurrentPosition(pointCoordinates);
    }
}


const mapStateToProps = (state: ConstructorState): ResizerStateProps => {

    const {
        editParams,
        animationPosition,
    } = state;

    if (editParams === undefined) {
        throw new Error('editParams should not be undefined on Resizer initialize');
    }

    const {
        isMoving,
    } = editParams;

    const {
        blockScript,
    } = getEditedAnimationElementScript(state);

    const block = getFieldsValuesByPosition(animationPosition, blockScript);

    return {
        isMoving,
        block,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): ResizerDispatchProps => ({
    setEditedBlockFieldsOnCurrentPosition: (blockFields) => {
        dispatch(setEditedBlockFieldsOnCurrentPositionAction(blockFields));
    },
});

export const Resizer = connect(mapStateToProps, mapDispatchToProps)(ResizerComponent);
