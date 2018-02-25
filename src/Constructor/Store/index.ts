import { createStore } from 'redux';
import { createConstructorReducer } from './reducers';
import { ConstructorState } from './State';

export function createConstructorStore(initialState: ConstructorState) {
    const playerReducer = createConstructorReducer(initialState);

    return createStore(playerReducer);
}
