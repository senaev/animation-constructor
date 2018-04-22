import { connect, MapStateToPropsFactory } from 'react-redux';
import { ConstructorState } from '../../Store/ConstructorState';
import { Board, BoardParams, } from './';

const makeMapStoreToProps: MapStateToPropsFactory<BoardParams, {}, ConstructorState> = (initialStore, initialOwnProps) => {
    return (state, ownProps): BoardParams => {
        const {
            editingAsJSONParams,
        } = state;

        return {
            isEditingAsJSON: editingAsJSONParams !== undefined,
        };
    };
};

export const BoardConnected = connect(makeMapStoreToProps)(Board);
