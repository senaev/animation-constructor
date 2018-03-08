import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { AnimationElementScript, AnimationScript } from '../../../AnimationScript';
import { BlockLocation } from '../../../BlockLocation/BlockLocation';
import { AVAILABLE_RELATIONS } from '../../../Relation/AVAILABLE_RELATIONS';
import { Relation } from '../../../Relation/Relation';

export type ConstructorState = {
    editParams: {
        isNewElement: boolean;
        blockLocation: BlockLocation;
        initialAnimationElementScript: AnimationElementScript<AnimationElementName>;
    } | undefined,
    relation: Relation;
    animationScript: AnimationScript;
    animationPosition: number;
};

export const defaultConstructorState: ConstructorState = {
    editParams: undefined,
    relation: AVAILABLE_RELATIONS[0],
    animationScript: [],
    animationPosition: 0,
};
