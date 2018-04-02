import { createAction } from 'redux-act';
import { AnimationElementFieldsTypes } from '../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElements } from '../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../AnimationElements/AnimationElementsFieldsUnits';
import { Block } from '../Block/Block';
import { BlockFieldUnits } from '../Block/BlockFieldUnits';
import { BlockLocation } from '../BlockLocation/BlockLocation';
import { PointCoordinates } from '../types/PointCoordinates';
import { ConstructorStore } from './ConstructorStore';
import { AdditionalStep } from './types/AdditionalStep';
import { EditableStep } from './types/EditableStep';
import { EditableStepPosition } from './types/EditableStepPosition';
import { EditableStepValue } from './types/EditableStepValue';

export const addStandardElementAction =
    createAction<AnimationElements>('addStandardElementAction');

export const selectBlockAction =
    createAction<BlockLocation | undefined>('selectBlockAction');

export const setEditedBlockMovingAction =
    createAction<boolean>('setEditedBlockMovingAction');
export const setEditedBlockResizingAction =
    createAction<boolean>('setEditedBlockResizingAction');
export const setEditedBlockRotatingAction =
    createAction<boolean>('setEditedBlockRotatingAction');

export const setScaleCoordinatesAction = createAction<PointCoordinates>('setScaleCoordinatesAction');
export const zoomInAction = createAction('zoomInAction');
export const zoomOutAction = createAction('zoomOutAction');

export const setEditedBlockFieldsOnCurrentPositionAction =
    createAction<Partial<Block>>('setEditedBlockFieldsOnCurrentPositionAction');
export const setEditedElementFieldsAction =
    createAction<Partial<AnimationElementFieldsTypes<AnimationElements>>>('setEditedElementFieldsAction');

export const setAnimationPositionAction =
    createAction<ConstructorStore['animationPosition']>('setAnimationPositionAction');

export const setBlockScriptStepPositionAction =
    createAction<EditableStepPosition<BlockFieldUnits>>('setBlockScriptStepPositionAction');
export const setFieldsScriptStepPositionAction =
    createAction<EditableStepPosition<AnimationElementsFieldsUnits[AnimationElements]>>('setFieldsScriptStepPositionAction');

export const setBlockScriptStepValueAction =
    createAction<EditableStepValue<BlockFieldUnits>>('setBlockScriptStepValueAction');
export const setFieldsScriptStepValueAction =
    createAction<EditableStepValue<AnimationElementsFieldsUnits[AnimationElements]>>('setFieldsScriptStepValueAction');

export const removeBlockScriptStepAction =
    createAction<EditableStep<BlockFieldUnits>>('removeBlockScriptStepAction');
export const removeFieldsScriptStepAction =
    createAction<EditableStep<AnimationElementsFieldsUnits[AnimationElements]>>('removeFieldsScriptStepAction');

export const addBlockScriptStepAction =
    createAction<AdditionalStep<BlockFieldUnits>>('addBlockScriptStepAction');
export const addFieldsScriptStepAction =
    createAction<AdditionalStep<AnimationElementsFieldsUnits[AnimationElements]>>('addFieldsScriptStepAction');
