import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { removeElementFromArray } from '../../utils/removeElementFromArray';
import { ConstructorState } from '../State';

export function removeElement(state: ConstructorState,
                              blockLocation: BlockLocation): ConstructorState {
    const { animationScript } = state;

    const blockIndex = blockLocation[0];

    return {
        ...state,
        animationScript: removeElementFromArray(animationScript, blockIndex),
    };
}
