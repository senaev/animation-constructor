import { connect, MapStateToPropsFactory } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { actions } from '../../../Store/actions';
import { ConstructorState } from '../../../Store/ConstructorState';
import { JSONEditorScreen, JSONEditorScreenCallbacks, JSONEditorScreenParams } from './';

const makeMapStoreToProps: MapStateToPropsFactory<JSONEditorScreenParams, {}, ConstructorState> = (initialStore, initialOwnProps) => {
    return (state, ownProps): JSONEditorScreenParams => {
        const {
            animationScript,
        } = state;

        return {
            animationScript,
        };
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): JSONEditorScreenCallbacks => {
    return {
        onCancel: () => dispatch(actions.cancelEditingJSON()),
        onSave: (nextAnimationScript) => dispatch(actions.saveAnimationScript(nextAnimationScript)),
    };
};

export const JSONEditorScreenConnected = connect(makeMapStoreToProps, mapDispatchToProps)(JSONEditorScreen);
