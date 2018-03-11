import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { ConstructorState } from '../State';
import { getAnimationElementScriptByBlockLocation } from './getAnimationElementScriptByBlockLocation';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';

export function getEditedAnimationElementScript<T extends AnimationElementName>
(state: ConstructorState): AnimationElementScript<T> {
    return getAnimationElementScriptByBlockLocation(state.animationScript, getEditedAnimationElementBlockLocation(state));
}
