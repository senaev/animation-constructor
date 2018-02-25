import { addElementEventListener } from '../addElementEventListener';


export function subscribeHoverChange(element: Element, callback: (isHovered: boolean) => void): () => void {
    const unsubscribeMouseEnter = addElementEventListener(element, 'mouseenter', () => {
        callback(true);
    });
    const unsubscribeMouseLeave = addElementEventListener(element, 'mouseleave', () => {
        callback(false);
    });

    return () => {
        unsubscribeMouseEnter();
        unsubscribeMouseLeave();
    };
}
