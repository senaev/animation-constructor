import { AnimationElementScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { ConstructorState } from '../Store/State';

export function setAnimationElementScript(state: ConstructorState,
                                          blockLocation: BlockLocation,
                                          animationElementScript: AnimationElementScript): ConstructorState {
    const { animationScript } = state;

    const blockIndex = blockLocation[0];

    const nextAnimationScript = [...animationScript];
    nextAnimationScript[blockIndex] = animationElementScript;

    return {
        ...state,
        animationScript: nextAnimationScript,
    };
}
