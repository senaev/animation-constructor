import { ElementsAnimations } from '../../Animation/ElementsAnimations';
import { BlockLocation } from '../BlockLocation';

export function getBlockLocationByElement(containerElement: HTMLElement,
                                          element: HTMLElement,
                                          elementsAnimations: ElementsAnimations): BlockLocation | undefined {
    // TODO: suport recursive blocks

    let comparationElement = element;
    while (comparationElement !== containerElement) {
        for (let i = 0; i < elementsAnimations.length; i++) {
            const { container } = elementsAnimations[i];

            if (comparationElement === container) {
                return [i];
            }
        }

        const { parentElement } = comparationElement;

        if (parentElement === containerElement) {
            return undefined;
        }

        if (parentElement === null) {
            throw new Error('Wrong containerElement has been passed to getBlockLocationByHTMLElement()');
        }

        comparationElement = parentElement;
    }

    return undefined;
}
