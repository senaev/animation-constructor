import { prependChild } from '../prependChild';

// TODO: return removeStylesFromPage function
// TODO: one style for component in document
export function addStylesToPage(document: HTMLDocument, styles: string): void {
    requestAnimationFrame(() => {
        const style = document.createElement('style');

        // TODO: combine all styles in one container
        style.innerHTML = styles;
        prependChild(document.head, style);
    });
}
