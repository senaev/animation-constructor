import { createStore } from 'redux';
import { createConstructorReducer } from './reducers';
import { ConstructorState } from './State';

const win: {
    /**
     * [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
     */
    __REDUX_DEVTOOLS_EXTENSION__: () => ConstructorState;
} = window as any;

export function createAnimationConstructorStore(initialState: ConstructorState) {
    const playerReducer = createConstructorReducer(initialState);

    return createStore(playerReducer, win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__());
}
