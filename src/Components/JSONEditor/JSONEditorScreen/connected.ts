import { connect, MapStateToPropsFactory } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { ConstructorState } from '../../../Store/ConstructorState';
import { JSONEditorScreen, JSONEditorScreenCallbacks, JSONEditorScreenParams } from './';

const makeMapStoreToProps: MapStateToPropsFactory<JSONEditorScreenParams, {}, ConstructorState> = (initialStore, initialOwnProps) => {
    return (state, ownProps): JSONEditorScreenParams => {
        const {
            editingAsJSONParams,
        } = state;

        if (editingAsJSONParams === undefined) {
            throw new Error('JSONEditorScreenConnected should not been rendered when editingAsJSONParams is not set');
        }

        const {
            jsonString,
        } = editingAsJSONParams;

        return {
            jsonString,
        };
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): JSONEditorScreenCallbacks => {
    return {
        //
    };
};

export const JSONEditorScreenConnected = connect(makeMapStoreToProps, mapDispatchToProps)(JSONEditorScreen);
