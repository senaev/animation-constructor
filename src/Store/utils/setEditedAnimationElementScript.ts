import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { ConstructorState } from '../State';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';

export function setEditedAnimationElementScript<T extends AnimationElementName>
(state: ConstructorState,
 animationElementScript: AnimationElementScript<T>): ConstructorState {
    const { animationScript } = state;

    const blockLocation = getEditedAnimationElementBlockLocation(state);
    const blockIndex = blockLocation[0];

    const nextAnimationScript = [...animationScript];
    nextAnimationScript[blockIndex] = animationElementScript;

    return {
        ...state,
        animationScript: nextAnimationScript,
    };
}
