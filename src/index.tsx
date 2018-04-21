import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { App } from './Components/App';
import { ConstructorState, defaultConstructorState } from './Store/ConstructorState';
import { createConstructorStore } from './Store/createConstructorStore';

function drawAnimationConstructor(container: HTMLElement): void {
    const store: Store<ConstructorState> = createConstructorStore(defaultConstructorState);

    ReactDOM.render(
        <Provider store={ store }>
            <App/>
        </Provider>,
        container,
    );
}

(window as any).drawAnimationConstructor = drawAnimationConstructor;
