import * as cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { getFieldsValuesByPosition } from '../../Animation/util/getFieldsValuesByPosition';
import { Block } from '../../Block/Block';
import { blockToStyles } from '../../Block/utils/blockToStyles';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import {
    setEditedBlockFieldsOnCurrentPositionAction,
    setEditedBlockMovingAction,
    setEditedBlockResizingAction,
    setEditedBlockRotatingAction,
} from '../../Store/actions';
import { ConstructorStore } from '../../Store/ConstructorStore';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { areArraysEqual } from '../../utils/areArraysEqual/areArraysEqual';
import { DragListener } from '../../utils/DragListener/DragListener';
import { getAngleRelativeToOrigin } from '../../utils/Trigonometry/getAngleRelativeToOrigin';
import { getRectangleSizeByPointAndAngle } from '../../utils/Trigonometry/getRectangleSizeByPointAndAngle';
import * as c from './index.pcss';

export type ResizerStateProps = {
    isMoving: boolean;
    isResizing: boolean;
    isRotating: boolean;
    blockLocation: BlockLocation;
    block: Block;
};

export type ResizerDispatchProps = {
    setEditedBlockMoving: (isMoving: boolean) => void;
    setEditedBlockResizing: (isResizing: boolean) => void;
    setEditedBlockRotating: (isRotating: boolean) => void;
    setEditedBlockFieldsOnCurrentPosition: (blockFields: Partial<Block>) => void;
};

export type ResizerProps =
    & ResizerStateProps
    & ResizerDispatchProps;

class ResizerComponent extends React.Component<ResizerProps, {}> {
    private containerElement?: HTMLDivElement | null;
    private moveElement?: HTMLDivElement | null;
    private resizeElement?: HTMLDivElement | null;
    private rotationElement?: HTMLDivElement | null;

    private dragListenerForResize?: DragListener;
    private dragListenerForRotation?: DragListener;
    private dragListenerForMove?: DragListener;

    public render() {
        const {
            isMoving,
            isResizing,
            isRotating,
            block,
        } = this.props;

        const resizerStyles = blockToStyles({
            ...block,
            existence: true,
        });

        return <div
            className={ c.Resizer__container }
            ref={ (element) => {
                this.containerElement = element;
            } }
        >
            <div
                className={ c.Resizer }
                style={ resizerStyles }>
                <div className={ cx(c.Resizer__dottedLine, c.Resizer__dottedLine_white) }/>
                <div className={ c.Resizer__dottedLine }/>
                <div
                    className={ c.Resizer__mover }
                    ref={ (element) => {
                        this.moveElement = element;
                    } }/>
                <div className={ cx({
                    [c.Resizer__controlsContainer_hidden]: isMoving || isResizing || isRotating,
                }) }>
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
            </div>
        </div>;
    }

    public componentWillReceiveProps({
                                         isMoving,
                                         blockLocation,
                                     }: ResizerProps) {
        if (!isMoving || areArraysEqual(blockLocation, this.props.blockLocation)) {
            return;
        }

        const {
            dragListenerForMove,
        } = this;

        if (!dragListenerForMove) {
            throw new Error('dragListenerForResize should be set before other block selecting');
        }

        dragListenerForMove.start();
    }

    public componentDidMount() {
        this.initMover();
        this.initResizer();
        this.initRotator();
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

    private initMover() {
        const {
            moveElement,
        } = this;

        if (!moveElement) {
            throw new Error('moveElement has not been initialized');
        }

        const {
            isMoving,
            setEditedBlockMoving,
            setEditedBlockFieldsOnCurrentPosition,
        } = this.props;

        let startBlock: Readonly<PointCoordinates>;
        this.dragListenerForMove = new DragListener(moveElement, {
            onStart: () => {
                const {
                    x,
                    y,
                } = this.props.block;

                startBlock = {
                    x,
                    y,
                };

                setEditedBlockMoving(true);
            },
            onMove: ({ relativeX, relativeY }) => {
                const percentageInPixel = this.getPercentageInPixel();

                setEditedBlockFieldsOnCurrentPosition({
                    x: startBlock.x + relativeX * percentageInPixel,
                    y: startBlock.y + relativeY * percentageInPixel,
                });
            },
            onEnd: () => {
                setEditedBlockMoving(false);
            },
        });

        if (isMoving) {
            this.dragListenerForMove.start();
        }
    }

    private initResizer() {
        const {
            resizeElement,
        } = this;

        if (!resizeElement) {
            throw new Error('resizeElement has not been initialized');
        }

        const {
            setEditedBlockResizing,
            setEditedBlockFieldsOnCurrentPosition,
        } = this.props;

        let blockOriginAbsoluteCoordinates: Readonly<PointCoordinates>;
        let cursorOffset: PointCoordinates;
        this.dragListenerForResize = new DragListener(resizeElement, {
            onStart: ({
                          startX,
                          startY,
                      }) => {
                setEditedBlockResizing(true);
                blockOriginAbsoluteCoordinates = this.getBlockOriginAbsoluteCoordinates();

                const pixelsInPercent = this.getPixelsInPercent();

                const {
                    width,
                    height,
                    rotation,
                } = this.props.block;

                const {
                    width: cursorOffsetX,
                    height: cursorOffsetY,
                } = getRectangleSizeByPointAndAngle(
                    {
                        x: startX - blockOriginAbsoluteCoordinates.x,
                        y: startY - blockOriginAbsoluteCoordinates.y,
                    },
                    rotation,
                );

                cursorOffset = {
                    x: cursorOffsetX / pixelsInPercent - width,
                    y: cursorOffsetY / pixelsInPercent - height,
                };
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
                setEditedBlockFieldsOnCurrentPosition({
                    width: Math.max(0, width) / pixelsInPercent - cursorOffset.x,
                    height: Math.max(0, height) / pixelsInPercent - cursorOffset.y,
                });
            },
            onEnd: () => {
                setEditedBlockResizing(false);
            },
        });
    }

    private initRotator() {
        const {
            rotationElement,
        } = this;

        if (!rotationElement) {
            throw new Error('rotationElement has not been initialized');
        }

        const {
            setEditedBlockRotating,
            setEditedBlockFieldsOnCurrentPosition,
        } = this.props;

        let startRotationPosition: number;
        this.dragListenerForRotation = new DragListener(rotationElement, {
            onStart: (dragPosition) => {
                setEditedBlockRotating(true);

                const startSliderRotationPosition = this.getCursorAngleRelativeToBlockOrigin(dragPosition);
                const startBlockRotationPosition = this.props.block.rotation;

                startRotationPosition = startBlockRotationPosition - startSliderRotationPosition;
            },
            onMove: (dragPosition) => {
                const cursorAngle = this.getCursorAngleRelativeToBlockOrigin(dragPosition);

                setEditedBlockFieldsOnCurrentPosition({
                    rotation: cursorAngle + startRotationPosition,
                });
            },
            onEnd: () => {
                setEditedBlockRotating(false);
            },
        });
    }

    private getBlockOriginAbsoluteCoordinates(): PointCoordinates {
        const parentRect = this.getContainerBlockRect();

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

    private getContainerBlockRect(): ClientRect {
        const {
            containerElement,
        } = this;

        if (!containerElement) {
            throw new Error('containerElement is not defined');
        }

        return containerElement.getBoundingClientRect();
    }

    private getPercentageInPixel(): UnitTypes[Unit.percent] {
        return 100 / this.getContainerBlockRect().width;
    }

    private getPixelsInPercent(): number {
        return this.getContainerBlockRect().width / 100;
    }
}


const mapStateToProps = (state: ConstructorStore): ResizerStateProps => {

    const {
        editParams,
        animationPosition,
    } = state;

    if (editParams === undefined) {
        throw new Error('editParams should not be undefined on Resizer initialize');
    }

    const {
        isMoving,
        isResizing,
        isRotating,
        blockLocation,
    } = editParams;

    const {
        blockScript,
    } = getEditedAnimationElementScript(state);

    const block = getFieldsValuesByPosition(animationPosition, blockScript);

    return {
        isMoving,
        isResizing,
        isRotating,
        blockLocation,
        block,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): ResizerDispatchProps => ({
    setEditedBlockMoving: (isMoving) => {
        dispatch(setEditedBlockMovingAction(isMoving));
    },
    setEditedBlockResizing: (isResizing) => {
        dispatch(setEditedBlockResizingAction(isResizing));
    },
    setEditedBlockRotating: (isRotating) => {
        dispatch(setEditedBlockRotatingAction(isRotating));
    },
    setEditedBlockFieldsOnCurrentPosition: (blockFields) => {
        dispatch(setEditedBlockFieldsOnCurrentPositionAction(blockFields));
    },
});

export const Resizer = connect(mapStateToProps, mapDispatchToProps)(ResizerComponent);
