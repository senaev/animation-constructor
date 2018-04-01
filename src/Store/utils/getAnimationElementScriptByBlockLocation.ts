import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementScript, AnimationScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';

export function getAnimationElementScriptByBlockLocation<T extends AnimationElements>
(animationScript: AnimationScript,
 blockLocation: BlockLocation): AnimationElementScript<T> {
    const blockIndex = blockLocation[0];
    return animationScript[blockIndex] as AnimationElementScript<T>;
}
