import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { App } from './Components/App';
import { createAnimationConstructorStore } from './Store/createAnimationConstructorStore';
import { ConstructorStore, defaultConstructorState } from './Store/State';

function drawAnimationConstructor(container: HTMLElement): void {
    const store: Store<ConstructorStore> = createAnimationConstructorStore(defaultConstructorState);

    ReactDOM.render(
        <Provider store={ store }>
            <App/>
        </Provider>,
        container,
    );
}

(window as any).drawAnimationConstructor = drawAnimationConstructor;
