import { createAction, EmptyActionCreator, SimpleActionCreator } from 'redux-act';
import { AnimationElementFieldsTypes } from '../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElements } from '../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../AnimationElements/AnimationElementsFieldsUnits';
import { Block } from '../Block/Block';
import { BlockFieldUnits } from '../Block/BlockFieldUnits';
import { BlockLocation } from '../BlockLocation/BlockLocation';
import { PointCoordinates } from '../types/PointCoordinates';
import { mapObjectValues } from '../utils/mapObjectValues';
import { ConstructorStore } from './ConstructorStore';
import { AdditionalStep } from './types/AdditionalStep';
import { EditableStep } from './types/EditableStep';
import { EditableStepPosition } from './types/EditableStepPosition';
import { EditableStepValue } from './types/EditableStepValue';

const anyParam: any = undefined;

const ActionTypes = {
    addStandardElement: anyParam as AnimationElements,

    selectBlock: anyParam as (BlockLocation | undefined),

    setEditedBlockMoving: anyParam as boolean,
    setEditedBlockResizing: anyParam as boolean,
    setEditedBlockRotating: anyParam as boolean,

    setScaleCoordinates: anyParam as PointCoordinates,
    zoomIn: anyParam as undefined,
    zoomOut: anyParam as undefined,

    setEditedBlockFieldsOnCurrentPosition: anyParam as Partial<Block>,
    setEditedElementFields: anyParam as Partial<AnimationElementFieldsTypes<AnimationElements>>,

    setAnimationPosition: anyParam as ConstructorStore['animationPosition'],

    setBlockScriptStepPosition: anyParam as EditableStepPosition<BlockFieldUnits>,
    setFieldsScriptStepPosition: anyParam as EditableStepPosition<AnimationElementsFieldsUnits[AnimationElements]>,

    setBlockScriptStepValue: anyParam as EditableStepValue<BlockFieldUnits>,
    setFieldsScriptStepValue: anyParam as EditableStepValue<AnimationElementsFieldsUnits[AnimationElements]>,

    removeBlockScriptStep: anyParam as EditableStep<BlockFieldUnits>,
    removeFieldsScriptStep: anyParam as EditableStep<AnimationElementsFieldsUnits[AnimationElements]>,

    addBlockScriptStep: anyParam as AdditionalStep<BlockFieldUnits>,
    addFieldsScriptStep: anyParam as AdditionalStep<AnimationElementsFieldsUnits[AnimationElements]>,
};
type ActionTypes = typeof ActionTypes;

export const actions: {
    [key in keyof ActionTypes]: ActionTypes[key] extends undefined ? EmptyActionCreator : SimpleActionCreator<ActionTypes[key]>;
} = mapObjectValues(ActionTypes, (u, actionName) => createAction(actionName) as any);
