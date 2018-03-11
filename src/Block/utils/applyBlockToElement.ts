import { getObjectKeys } from '../../utils/getObjectKeys';
import { Block } from '../Block';
import { blockToStyles } from './blockToStyles';

export function applyBlockToElement(element: HTMLElement, block: Block): void {
    const stylesObject = blockToStyles(block);
    getObjectKeys(stylesObject).forEach((styleProp) => {
        element.style[styleProp] = stylesObject[styleProp];
    });
}
