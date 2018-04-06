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

const any: any = undefined;

const ActionTypes = {
    addStandardElement: any as AnimationElements,

    selectBlock: any as (BlockLocation | undefined),

    setEditedBlockMoving: any as boolean,
    setEditedBlockResizing: any as boolean,
    setEditedBlockRotating: any as boolean,

    setScaleCoordinates: any as PointCoordinates,
    zoomIn: any as undefined,
    zoomOut: any as undefined,

    setEditedBlockFieldsOnCurrentPosition: any as Partial<Block>,
    setEditedElementFields: any as Partial<AnimationElementFieldsTypes<AnimationElements>>,

    setAnimationPosition: any as ConstructorStore['animationPosition'],

    setBlockScriptStepPosition: any as EditableStepPosition<BlockFieldUnits>,
    setFieldsScriptStepPosition: any as EditableStepPosition<AnimationElementsFieldsUnits[AnimationElements]>,

    setBlockScriptStepValue: any as EditableStepValue<BlockFieldUnits>,
    setFieldsScriptStepValue: any as EditableStepValue<AnimationElementsFieldsUnits[AnimationElements]>,

    removeBlockScriptStep: any as EditableStep<BlockFieldUnits>,
    removeFieldsScriptStep: any as EditableStep<AnimationElementsFieldsUnits[AnimationElements]>,

    addBlockScriptStep: any as AdditionalStep<BlockFieldUnits>,
    addFieldsScriptStep: any as AdditionalStep<AnimationElementsFieldsUnits[AnimationElements]>,
};
type ActionTypes = typeof ActionTypes;

export const actions: {
    [key in keyof ActionTypes]: ActionTypes[key] extends undefined ? EmptyActionCreator : SimpleActionCreator<ActionTypes[key]>;
} = mapObjectValues(ActionTypes, (u, actionName) => createAction(actionName) as any);
