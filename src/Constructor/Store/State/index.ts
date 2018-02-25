import { AnimationElementFieldsTypes } from '../../../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { AnimationScript } from '../../../AnimationScript';
import { BlockLocation } from '../../../BlockLocation/BlockLocation';
import { BlockPosition } from '../../../BlockPosition/BlockPosition';
import { AVAILABLE_RELATIONS } from '../../../Relation/AVAILABLE_RELATIONS';
import { Relation } from '../../../Relation/Relation';

export type EditedElement<T extends AnimationElementName = AnimationElementName> = {
    blockLocation: BlockLocation | undefined;
    elementName: T;
    position: BlockPosition;
    fieldsValues: AnimationElementFieldsTypes<T>;
    // animationElementScript: AnimationElementScript<T>;
};

export type ConstructorState = {
    editedElement: EditedElement | undefined;
    relation: Relation;
    animationScript: AnimationScript;
    animationPosition: number;
};

export const defaultConstructorState: ConstructorState = {
    editedElement: undefined,
    relation: AVAILABLE_RELATIONS[0],
    animationScript: [],
    animationPosition: 0,
};
