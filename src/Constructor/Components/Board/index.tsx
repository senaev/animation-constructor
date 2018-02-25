import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { addStylesToPage } from '../../../utils/addStylesToPage';
import { ConstructorState } from '../../Store/State';
import { AnimationControls } from '../AnimationControls';
import { BoardFields } from '../BoardFields';
import { BoardPalette } from '../BoardPalette';
import { BoardPreview } from '../BoardPreview';

// TODO
addStylesToPage(document, require('./index.css'));

export type BoardStateProps = Pick<ConstructorState,
    | 'editedElement'>;

export type BoardDispatchProps = {};

export type BoardProps =
    & BoardStateProps
    & BoardDispatchProps;

class BoardComponent extends React.Component<BoardProps, {}> {
    public render() {
        const { editedElement } = this.props;

        return <div>
            {
                editedElement === undefined
                    ? <BoardPalette/>
                    : <BoardFields editedElement={ editedElement }/>
            }
            <BoardPreview/>
            <div className={ 'Board__animationControlsContainer' }>
                <div className={ 'Board__animationControlsContainerPadding' }>
                    <AnimationControls/>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = ({
                             editedElement,
                         }: ConstructorState): BoardStateProps => ({
    editedElement,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardDispatchProps => ({
    //
});

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
