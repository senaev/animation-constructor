import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createConstructorReducer } from './reducers';
import { ConstructorState } from './State';

export function createAnimationConstructorStore(initialState: ConstructorState) {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    );

    const playerReducer = createConstructorReducer(initialState);

    return createStore(playerReducer, enhancer);
}
