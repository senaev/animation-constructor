import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../../AnimationScript';
import { ConstructorState } from '../State';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';

export function getEditedAnimationElementScript<T extends AnimationElementName>
(state: ConstructorState): AnimationElementScript<T> {
    const blockIndex = getEditedAnimationElementBlockLocation(state)[0];
    return state.animationScript[blockIndex] as AnimationElementScript<T>;
}
