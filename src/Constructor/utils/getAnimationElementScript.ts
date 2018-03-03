import { AnimationElementScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { ConstructorState } from '../Store/State';

export function getAnimationElementScript(state: ConstructorState,
                                          blockLocation: BlockLocation): AnimationElementScript {
    const blockNumber = blockLocation[0];
    return state.animationScript[blockNumber];
}
