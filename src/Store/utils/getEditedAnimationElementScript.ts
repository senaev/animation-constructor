import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementScript } from '../../AnimationScript';
import { ConstructorStore } from '../State';
import { getAnimationElementScriptByBlockLocation } from './getAnimationElementScriptByBlockLocation';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';

export function getEditedAnimationElementScript<T extends AnimationElements>
(state: ConstructorStore): AnimationElementScript<T> {
    return getAnimationElementScriptByBlockLocation(state.animationScript, getEditedAnimationElementBlockLocation(state));
}
