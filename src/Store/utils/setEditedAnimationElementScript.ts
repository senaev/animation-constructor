import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementScript } from '../../AnimationScript';
import { ConstructorStore } from '../ConstructorStore';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';

export function setEditedAnimationElementScript<T extends AnimationElements>
(state: ConstructorStore,
 animationElementScript: AnimationElementScript<T>): ConstructorStore {
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
