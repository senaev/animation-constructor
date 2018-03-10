import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { ConstructorState } from '../State';

export function getAnimationElementScriptByBlockLocation<T extends AnimationElementName>
(state: ConstructorState,
 blockLocation: BlockLocation): AnimationElementScript<T> {
    const blockIndex = blockLocation[0];
    return state.animationScript[blockIndex] as AnimationElementScript<T>;
}
