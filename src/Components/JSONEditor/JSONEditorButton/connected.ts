import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { actions } from '../../../Store/actions';
import { JSONEditorButton, JSONEditorButtonCallbacks } from './index';

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): JSONEditorButtonCallbacks => {
    return {
        onClick: () => dispatch(actions.startEditingJSON()),
    };
};

export const JSONEditorButtonConnected = connect(undefined, mapDispatchToProps)(JSONEditorButton);
