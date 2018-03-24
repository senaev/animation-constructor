import { createStore } from 'redux';
import { createConstructorReducer } from './reducers';
import { ConstructorState } from './State';

const win: {
    __REDUX_DEVTOOLS_EXTENSION__: () => ConstructorState;
} = window as any;

export function createAnimationConstructorStore(initialState: ConstructorState) {
    const playerReducer = createConstructorReducer(initialState);

    return createStore(playerReducer, win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__());
}
