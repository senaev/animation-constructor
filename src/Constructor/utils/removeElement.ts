import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { removeElementFromArray } from '../../utils/removeElementFromArray';
import { ConstructorState } from '../Store/State';

export function removeElement(state: ConstructorState,
                              blockLocation: BlockLocation): ConstructorState {
    const { animationScript } = state;

    const blockNumber = blockLocation[0];

    return {
        ...state,
        animationScript: removeElementFromArray(animationScript, blockNumber),
    };
}
