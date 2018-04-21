import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementScript } from '../../AnimationScript';
import { ConstructorState } from '../ConstructorState';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';

export function setEditedAnimationElementScript<T extends AnimationElements>
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
