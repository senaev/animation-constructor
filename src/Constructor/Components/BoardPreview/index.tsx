import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { BlockLocation } from '../../../BlockLocation/BlockLocation';
import { selectBlockAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { AnimationPreview } from '../AnimationPreview';
import { Drawing } from '../Drawing';
import { FillSizeBlock } from '../FillSizeBlock';
import * as c from './index.pcss';

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

class BoardPreviewComponent extends React.Component<BoardPreviewProps, {}> {
    public render() {
        const {
            editedElement,
            relation,
            animationScript,
            animationPosition,
        } = this.props;

        return <div className={ c.BoardPreview }>
            <div className={ c.BoardPreview__fillSizeContainer }>
                <FillSizeBlock
                    relationX={ relation[0] }
                    relationY={ relation[1] }
                    additionalContainerStyles={ {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } }
                >
                    <div className={ c.BoardPreview__editContainer }>
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
