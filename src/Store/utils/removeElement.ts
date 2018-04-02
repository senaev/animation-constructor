import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { removeElementFromArray } from '../../utils/removeElementFromArray';
import { ConstructorStore } from '../ConstructorStore';

export function removeElement(state: ConstructorStore,
                              blockLocation: BlockLocation): ConstructorStore {
    const { animationScript } = state;

    const blockIndex = blockLocation[0];

    return {
        ...state,
        animationScript: removeElementFromArray(animationScript, blockIndex),
    };
}
