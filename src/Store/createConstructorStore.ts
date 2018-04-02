import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ConstructorStore } from './ConstructorStore';
import { createConstructorReducer } from './reducers';

export function createConstructorStore(initialState: ConstructorStore) {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    );

    const playerReducer = createConstructorReducer(initialState);

    return createStore(playerReducer, enhancer);
}
