import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { getRectangleByScale } from '../../Scale/utils/getRectangleByScale';
import { setEditedBlockAction, setScaleCoordinatesAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { addElementEventListener } from '../../utils/addElementEventListener';
import { DragListener } from '../../utils/DragListener';
import { noop } from '../../utils/noop';
import { rectangleToStyle } from '../../utils/rectangleToStyle';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { getCentralSquareOfRectangle } from '../../utils/Trigonometry/getCentralSquareOfRectangle';
import { getRectangleCenterCoordinates } from '../../utils/Trigonometry/getRectangleCenterCoordinates';
import { Square } from '../../utils/Trigonometry/Types/Square';
import { AnimationPreview } from '../AnimationPreview';
import { Drawing } from '../Drawing';
import { ScaleView } from '../ScaleView';
import { Zoom } from '../Zoom';
import * as c from './index.pcss';

const BACKGROUNDS_IN_SQUARE = 20;
const BACKGROUND_RELATION = 15;

export type BoardPreviewStateProps = Pick<ConstructorState,
    | 'editParams'
    | 'scaleCoordinates'
    | 'zoom'
    | 'relation'
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
                    <AnimationPreview
                        ref={ (element) => {
                            this.animationPreview = element;
                        } }
                        animationScript={ animationScript }
                        animationPosition={ animationPosition }
                        setEditedBlock={ setEditedBlock }/>
                </div>
                <div
                    className={ c.BoardPreview__relationContainer }
                    style={ this.getRelationContainerStyle() }
                />
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

        let startScalePosition: PointCoordinates;
        let startSquareSize: number;
        this.clickElementDragListener = new DragListener(scaleDragElement, {
            onStart: () => {
                startScalePosition = { ...this.props.scaleCoordinates };
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
        const animationSquareSize = this.getAnimationSquareSize();
        const backgroundSizeRaw = animationSquareSize / (BACKGROUNDS_IN_SQUARE * BACKGROUND_RELATION);

        const backgroundSize = Math.ceil(backgroundSizeRaw * BACKGROUND_RELATION);

        const {
            x,
            y,
        } = this.getScaleCenterRelative();

        return {
            backgroundPosition: `calc(${x}% + ${backgroundSize * (x / 100)}px) calc(${y}% + ${backgroundSize * (y / 100)}px)`,
            backgroundSize: `${backgroundSize}px`,
        };
    }

    private getScaleCenterRelative(): PointCoordinates {
        return getRectangleCenterCoordinates(this.getAnimationRectangleRelative());
    }

    private getSquare(): Square {
        const {
            width,
            height,
        } = this.state;

        return getCentralSquareOfRectangle({
            x: 0,
            y: 0,
            width,
            height,
        });
    }

    private getAnimationRectangleRelative(): PointCoordinates & Size {
        const square = this.getSquare();

        const squareRelative = {
            x: (square.x / square.size) * 100,
            y: (square.y / square.size) * 100,
            width: (square.size / (square.size + square.x * 2)) * 100,
            height: (square.size / (square.size + square.y * 2)) * 100,
        };

        const {
            scaleCoordinates,
            zoom,
        } = this.props;

        return {
            x: squareRelative.x + squareRelative.width * (scaleCoordinates.x / 100),
            y: squareRelative.y + squareRelative.height * (scaleCoordinates.y / 100),
            width: squareRelative.width * zoom,
            height: squareRelative.height * zoom,
        };
    }

    private getAnimationRectangleAbsolute(): PointCoordinates & Size {
        const {
            scaleCoordinates,
            zoom,
        } = this.props;

        const square = getCentralSquareOfRectangle({
            x: 0,
            y: 0,
            width: this.state.width,
            height: this.state.height,
        });

        const x = square.x + scaleCoordinates.x * (square.size / 100);
        const y = square.y + scaleCoordinates.y * (square.size / 100);
        const width = zoom * square.size;
        const height = zoom * square.size;

        return {
            x,
            y,
            width,
            height,
        };
    }

    private getAnimationSquareSize(): number {
        const animationSquareAbsolute = getCentralSquareOfRectangle(this.getAnimationRectangleAbsolute());

        return animationSquareAbsolute.size;
    }

    private getRelationContainerStyle(): {
        top: string;
        left: string;
        width: string;
        height: string;
    } {
        const rectangle = getRectangleByScale({
            x: 50,
            y: 50,
        }, 1, this.props.relation);

        return rectangleToStyle(rectangle);
    }
}

const mapStateToProps = ({
                             editParams,
                             scaleCoordinates,
                             zoom,
                             relation,
                             animationScript,
                             animationPosition,
                         }: ConstructorState): BoardPreviewStateProps => ({
    editParams,
    scaleCoordinates,
    zoom,
    relation,
    animationScript,
    animationPosition,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardPreviewDispatchProps => ({
    setEditedBlock: (blockLocation) => {
        dispatch(setEditedBlockAction(blockLocation));
    },
    setScalePosition: (scalePositoin) => {
        dispatch(setScaleCoordinatesAction(scalePositoin));
    },
});

export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(BoardPreviewComponent);
