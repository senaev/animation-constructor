import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { App } from './Components/App';
import { ConstructorStore, defaultConstructorState } from './Store/ConstructorStore';
import { createConstructorStore } from './Store/createConstructorStore';

function drawAnimationConstructor(container: HTMLElement): void {
    const store: Store<ConstructorStore> = createConstructorStore(defaultConstructorState);

    ReactDOM.render(
        <Provider store={ store }>
            <App/>
        </Provider>,
        container,
    );
}

(window as any).drawAnimationConstructor = drawAnimationConstructor;
