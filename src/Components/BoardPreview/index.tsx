import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { Scale } from '../../Scale/Scale';
import { setEditedBlockAction, setScaleFieldsAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { PointCoordinates } from '../../types/PointCoordinates';
import { addElementEventListener } from '../../utils/addElementEventListener';
import { DragListener } from '../../utils/DragListener';
import { noop } from '../../utils/noop';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { getCentralSquareOfRectangle } from '../../utils/Trigonometry/getCentralSquareOfRectangle';
import { getRectangleCenterCoordinates } from '../../utils/Trigonometry/getRectangleCenterCoordinates';
import { Square } from '../../utils/Trigonometry/Types/Square';
import { AnimationPreview } from '../AnimationPreview';
import { Drawing } from '../Drawing';
import { ScaleView } from '../ScaleView';
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
    width: number;
    height: number;
};

class BoardPreviewComponent extends React.Component<BoardPreviewProps, BoardPreviewState> {
    private scaleDragElement?: HTMLElement | null;
    private clickElement?: HTMLElement | null;
    private animationPreview?: AnimationPreview | null;

    private clickElementDragListener?: DragListener;
    private resizeSensor?: ResizeSensor;

    private removeElementClickListener = noop;

    constructor(props: BoardPreviewProps) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };
    }

    public render() {
        const {
            width,
            height,
        } = this.state;

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
            <ScaleView
                width={ width }
                height={ height }
            >
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
        } = this;

        if (!scaleDragElement || !animationPreview || !clickElement) {
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
                startSquareSize = this.getSquare().size;
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

        this.resizeSensor = new ResizeSensor(scaleDragElement, (size) => {
            this.setState(size);
        });

        this.setState(this.resizeSensor.getSize());
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

        const square = this.getSquare();

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

    private getSquare(): Square {
        const {
            width,
            height,
        } = this.state;

        return getCentralSquareOfRectangle(width, height);
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
