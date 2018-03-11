import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { setEditedBlockAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { addElementEventListener } from '../../utils/addElementEventListener';
import { noop } from '../../utils/noop';
import { AnimationPreview } from '../AnimationPreview';
import { Drawing } from '../Drawing';
import { ScaleView } from '../ScaleView';
import * as c from './index.pcss';

export type BoardPreviewStateProps = Pick<ConstructorState,
    | 'editParams'
    | 'animationScript'
    | 'animationPosition'>;

export type BoardPreviewDispatchProps = {
    setEditedBlock: (blockLocation: BlockLocation | undefined) => void;
};

export type BoardPreviewProps =
    & BoardPreviewStateProps
    & BoardPreviewDispatchProps;

class BoardPreviewComponent extends React.Component<BoardPreviewProps, {}> {
    private clickerElement?: HTMLElement | null;
    private animationPreview?: AnimationPreview | null;

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
                <ScaleView>
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
        } = this;

        if (!clickerElement || !animationPreview) {
            throw new Error('One of properties has not been initialized');
        }

        const {
            setEditedBlock,
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
    }

    public componentWillUnmount() {
        this.removeElementClickListener();
    }
}

const mapStateToProps = ({
                             editParams,
                             animationScript,
                             animationPosition,
                         }: ConstructorState): BoardPreviewStateProps => ({
    editParams,
    animationScript,
    animationPosition,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardPreviewDispatchProps => ({
    setEditedBlock: (blockLocation) => {
        dispatch(setEditedBlockAction(blockLocation));
    },
});

export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(BoardPreviewComponent);
