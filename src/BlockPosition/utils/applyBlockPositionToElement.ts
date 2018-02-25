import { getObjectKeys } from '../../utils/getObjectKeys';
import { BlockPosition } from '../BlockPosition';
import { blockPositionToStyles } from './blockPositionToStyles';

export function applyBlockPositionToElement(element: HTMLElement, blockPosition: BlockPosition): void {
    const stylesObject = blockPositionToStyles(blockPosition);
    getObjectKeys(stylesObject).forEach((styleProp) => {
        element.style[styleProp] = stylesObject[styleProp];
    });
}
