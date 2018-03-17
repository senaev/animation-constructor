import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { Scale } from '../../Scale/Scale';
import { setEditedBlockAction, setScaleFieldsAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { addElementEventListener } from '../../utils/addElementEventListener';
import { DragListener } from '../../utils/DragListener';
import { noop } from '../../utils/noop';
import { getRectangleCenterCoordinates } from '../../utils/Trigonometry/getRectangleCenterCoordinates';
import { AnimationPreview } from '../AnimationPreview';
import { Drawing } from '../Drawing';
import { DEFAULT_SQUARE } from '../FillCentralSquare';
import { ScaleView, ScaleViewComponent } from '../ScaleView';
import { Zoom } from '../Zoom';
import * as c from './index.pcss';

export type BoardPreviewStateProps = Pick<ConstructorState,
    | 'editParams'
    | 'scale'
    | 'animationScript'
    | 'animationPosition'>;

export type BoardPreviewDispatchProps = {
    setEditedBlock: (blockLocation: BlockLocation | undefined) => void;
    setScalePosition: (scalePosition: PointCoordinates) => void;
};

export type BoardPreviewProps =
    & BoardPreviewStateProps
    & BoardPreviewDispatchProps;

export type BoardPreviewState = {
    scaleAbsolutePosition: PointCoordinates & Size;
};

class BoardPreviewComponent extends React.Component<BoardPreviewProps, BoardPreviewState> {
    private scaleDragElement?: HTMLElement | null;
    private clickElement?: HTMLElement | null;
    private animationPreview?: AnimationPreview | null;

    private clickElementDragListener?: DragListener;

    private scaleView?: ScaleViewComponent;

    private removeElementClickListener = noop;

    public render() {
        const {
            editParams,
            animationScript,
            animationPosition,
            setEditedBlock,
        } = this.props;

        return <div className={ c.BoardPreview }>
            <div
                className={ c.BoardPreview__scaleDragElement }
                ref={ (element) => {
                    this.scaleDragElement = element;
                } }
                onMouseDown={ this.onScaleDragElementMouseDown }
                style={ this.getBackgroundStyle() }
            />
            <ScaleView rel={ (scaleViewComponent) => {
                this.scaleView = scaleViewComponent;
            } }>
                <div ref={ (element) => {
                    this.clickElement = element;
                } }>
                    <div className={ c.BoardPreview__editContainer }>
                        <AnimationPreview
                            ref={ (element) => {
                                this.animationPreview = element;
                            } }
                            animationScript={ animationScript }
                            animationPosition={ animationPosition }
                            setEditedBlock={ setEditedBlock }/>
                    </div>
                </div>
                {
                    editParams === undefined
                        ? null
                        : <Drawing/>
                }
            </ScaleView>
            <Zoom className={ c.BoardPreview__Zoom }/>
        </div>;
    }

    public componentDidMount() {
        const {
            scaleDragElement,
            clickElement,
            animationPreview,
            scaleView,
        } = this;

        if (!scaleDragElement || !animationPreview || !scaleView || !clickElement) {
            throw new Error('One of properties has not been initialized');
        }

        const {
            setEditedBlock,
            setScalePosition,
        } = this.props;

        this.removeElementClickListener = addElementEventListener(
            clickElement,
            'click',
            (event) => {
                const targetElement = event.target as HTMLElement;

                const elementIsPartOfAnimation = animationPreview.getIfHTMLElementIsPartOfAnimation(targetElement);

                if (!elementIsPartOfAnimation) {
                    throw new Error('element was clicked but it was not a part of animation');
                }

                const blockLocation = animationPreview.getBlockLocationByHTMLElement(targetElement);

                if (blockLocation === undefined) {
                    throw new Error('cannot find block location for element');
                }

                setEditedBlock(blockLocation);
            },
        );

        let startScalePosition: Scale;
        let startSquareSize: number;
        this.clickElementDragListener = new DragListener(scaleDragElement, {
            onStart: () => {
                startScalePosition = { ...this.props.scale };
                startSquareSize = scaleView.getSquareState().size;
            },
            onMove: ({
                         relativeX,
                         relativeY,
                     }) => {
                const nextScalePosition = {
                    x: startScalePosition.x + (relativeX / startSquareSize) * 100,
                    y: startScalePosition.y + (relativeY / startSquareSize) * 100,
                };

                setScalePosition(nextScalePosition);
            },
        });
    }

    public componentWillUnmount() {
        this.removeElementClickListener();

        const {
            clickElementDragListener,
        } = this;
        if (!clickElementDragListener) {
            throw new Error('one of properties has not been initialized');
        }

        clickElementDragListener.destroy();
    }

    private onScaleDragElementMouseDown = () => {
        // TODO: we need other logic to remove focus form animation element
        this.props.setEditedBlock(undefined);
    }

    private getBackgroundStyle(): {
        backgroundPosition: string,
        backgroundSize: string;
    } {
        // TODO: calculate and change
        const backgroundSize = 20;

        const {
            x,
            y,
        } = this.getScaleCenter();

        return {
            backgroundPosition: `calc(${x}% + ${backgroundSize * (x / 100)}px) calc(${y}% + ${backgroundSize * (y / 100)}px)`,
            backgroundSize: `${backgroundSize}px`,
        };
    }

    private getScaleCenter(): PointCoordinates {
        const { scale } = this.props;

        const {
            scaleView,
        } = this;

        const square = scaleView
            ? scaleView.getSquareState()
            : DEFAULT_SQUARE;

        const squareRelative = {
            x: (square.x / square.size) * 100,
            y: (square.y / square.size) * 100,
            width: (square.size / (square.size + square.x * 2)) * 100,
            height: (square.size / (square.size + square.y * 2)) * 100,
        };

        const x = squareRelative.x + squareRelative.width * (scale.x / 100);
        const y = squareRelative.y + squareRelative.height * (scale.y / 100);
        const width = (squareRelative.width / 100) * scale.width;
        const height = (squareRelative.height / 100) * scale.height;

        return getRectangleCenterCoordinates({
            x,
            y,
            width,
            height,
        });
    }
}

const mapStateToProps = ({
                             editParams,
                             scale,
                             animationScript,
                             animationPosition,
                         }: ConstructorState): BoardPreviewStateProps => ({
    editParams,
    scale,
    animationScript,
    animationPosition,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardPreviewDispatchProps => ({
    setEditedBlock: (blockLocation) => {
        dispatch(setEditedBlockAction(blockLocation));
    },
    setScalePosition: (scalePositoin) => {
        dispatch(setScaleFieldsAction(scalePositoin));
    },
});

export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(BoardPreviewComponent);
