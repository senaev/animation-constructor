import { AnimationElementFieldsNames } from '../../AnimationElements/AnimationElementFieldsNames';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { BlockPositionFieldName } from '../../BlockPosition/BlockPositionFieldName';

export type BlockPositionActionPosition = {
    blockPositionFieldName: BlockPositionFieldName;
    actionIndex: number;
    position: number;
};

export type FieldActionPosition = {
    fieldName: AnimationElementFieldsNames<AnimationElementName>;
    actionIndex: number;
    position: number;
};
