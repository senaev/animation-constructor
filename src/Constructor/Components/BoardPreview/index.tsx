import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { BlockLocation } from '../../../BlockLocation/BlockLocation';
import { addStylesToPage } from '../../../utils/addStylesToPage';
import { selectBlockAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { AnimationPreview } from '../AnimationPreview';
import { Drawing } from '../Drawing';
import { FillSizeBlock } from '../FillSizeBlock';

export type BoardPreviewStateProps = Pick<ConstructorState,
    | 'editedElement'
    | 'relation'
    | 'animationScript'
    | 'animationPosition'>;

export type BoardPreviewDispatchProps = {
    selectBlock: (blockLocation: BlockLocation) => void;
};

export type BoardPreviewProps =
    & BoardPreviewStateProps
    & BoardPreviewDispatchProps;

// TODO
addStylesToPage(document, require('./index.css'));

class BoardPreviewComponent extends React.Component<BoardPreviewProps, {}> {
    public render() {
        const {
            editedElement,
            relation,
            animationScript,
            animationPosition,
        } = this.props;

        return <div className={ 'BoardPreview' }>
            <div className={ 'BoardPreview__fillSizeContainer' }>
                <FillSizeBlock
                    relationX={ relation[0] }
                    relationY={ relation[1] }
                    additionalContainerStyles={ {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } }
                >
                    <div className={ 'BoardPreview__editContainer' }>
                        <FillSizeBlock
                            relationX={ 1 }
                            relationY={ 1 }
                            additionalContainerStyles={ {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            } }>
                            <AnimationPreview
                                animationScript={ animationScript }
                                animationPosition={ animationPosition }
                                onSelectBlock={ this.onSelectBlock }/>
                            {
                                editedElement === undefined
                                    ? null
                                    : <Drawing editedElement={ editedElement }/>
                            }
                        </FillSizeBlock>
                    </div>
                </FillSizeBlock>
            </div>
        </div>;
    }

    private onSelectBlock = (blockLocation: BlockLocation) => {
        this.props.selectBlock(blockLocation);
    }
}

const mapStateToProps = ({
                             editedElement,
                             relation,
                             animationScript,
                             animationPosition,
                         }: ConstructorState): BoardPreviewStateProps => ({
    editedElement,
    relation,
    animationScript,
    animationPosition,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardPreviewDispatchProps => ({
    selectBlock: (blockLocation) => {
        dispatch(selectBlockAction(blockLocation));
    },
});

export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(BoardPreviewComponent);
