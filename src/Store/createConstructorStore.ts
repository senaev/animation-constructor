import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ConstructorState } from './ConstructorState';
import { createConstructorReducer } from './reducers';

export function createConstructorStore(initialState: ConstructorState): Store<ConstructorState> {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    );

    const playerReducer = createConstructorReducer(initialState) as Reducer<ConstructorState>;

    return createStore(playerReducer, enhancer);
}
