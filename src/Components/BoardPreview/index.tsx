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
import { AnimationPreview } from '../AnimationPreview';
import { Drawing } from '../Drawing';
import { ScaleView, ScaleViewComponent } from '../ScaleView';
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

class BoardPreviewComponent extends React.Component<BoardPreviewProps, {}> {
    private clickerElement?: HTMLElement | null;
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
                className={ c.BoardPreview__clicker }
                ref={ (element) => {
                    this.clickerElement = element;
                } }
            >
                <ScaleView rel={ (scaleView) => {
                    this.scaleView = scaleView;
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
                </ScaleView>
            </div>
            {
                editParams === undefined
                    ? null
                    : <ScaleView>
                        <Drawing/>
                    </ScaleView>
            }
        </div>;
    }

    public componentDidMount() {
        const {
            clickerElement,
            animationPreview,
            scaleView,
        } = this;

        if (!clickerElement || !animationPreview || !scaleView) {
            throw new Error('One of properties has not been initialized');
        }

        const {
            setEditedBlock,
            setScalePosition,
        } = this.props;

        this.removeElementClickListener = addElementEventListener(
            clickerElement,
            'click',
            (event) => {
                const targetElement = event.target as HTMLElement;

                setEditedBlock(
                    animationPreview.getIfHTMLElementIsPartOfAnimation(targetElement)
                        ? animationPreview.getBlockLocationByHTMLElement(targetElement)
                        : undefined,
                );
            },
        );

        let startScalePosition: Scale;
        let startSquareSize: number;
        this.clickElementDragListener = new DragListener(clickerElement, {
            onStart: () => {
                startScalePosition = { ...this.props.scale };
                startSquareSize = scaleView.getSquareSize();
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
