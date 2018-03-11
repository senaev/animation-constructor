import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript, AnimationScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';

export function getAnimationElementScriptByBlockLocation<T extends AnimationElementName>
(animationScript: AnimationScript,
 blockLocation: BlockLocation): AnimationElementScript<T> {
    const blockIndex = blockLocation[0];
    return animationScript[blockIndex] as AnimationElementScript<T>;
}
