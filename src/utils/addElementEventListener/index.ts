import { noop } from '../noop';

export type EventMap =
    & HTMLElementEventMap
    & WindowEventMap;

export type HTMLElementEventName = keyof EventMap;

type EventListener = (this: EventTarget, event: Event) => any;

let isSupportsOnceOption = false;
let isSupportsCaptureOption = false;

const div = document.createElement('div');
const optionsCheckObject: AddEventListenerOptions = {};

Object.defineProperty(optionsCheckObject, 'once', {
    get: () => isSupportsOnceOption = true,
});
Object.defineProperty(optionsCheckObject, 'capture', {
    get: () => isSupportsCaptureOption = true,
});
div.addEventListener('click', noop, optionsCheckObject as any);

export function addElementEventListener<K extends HTMLElementEventName>(element: EventTarget,
                                                                        eventName: K,
                                                                        listener: EventListener,
                                                                        {
                                                                            capture,
                                                                            passive,
                                                                            once,
                                                                        }: AddEventListenerOptions = {}): () => void {
    const finalOptions: AddEventListenerOptions | boolean = isSupportsCaptureOption
        ? {
            capture,
            passive,
            once,
        }
        : Boolean(capture);

    const onceFallback: EventListener = function (event) {
        removeListener();
        // tslint:disable-next-line:no-invalid-this
        listener.call(this, event);
    };

    const finalListener: EventListener = once === true && !isSupportsOnceOption
        ? onceFallback
        : listener;

    const removeListener = () => {
        element.removeEventListener(eventName, finalListener, finalOptions);
    };

    element.addEventListener(eventName, finalListener, finalOptions);

    return removeListener;
}
