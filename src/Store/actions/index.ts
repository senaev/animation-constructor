import { createAction } from 'redux-act';
import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { Block } from '../../Block/Block';
import { BlockFieldUnits } from '../../Block/BlockFieldUnits';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { PointCoordinates } from '../../types/PointCoordinates';
import { ConstructorState } from '../State';
import { AdditionalStep } from '../types/AdditionalStep';
import { EditableStep } from '../types/EditableStep';
import { EditableStepPosition } from '../types/EditableStepPosition';
import { EditableStepValue } from '../types/EditableStepValue';

export const addStandardElementAction =
    createAction<AnimationElementName>('addStandardElementAction');
export const setEditedBlockAction =
    createAction<BlockLocation | undefined>('setEditedBlockAction');

export const setScaleCoordinatesAction = createAction<PointCoordinates>('setScaleCoordinatesAction');
export const zoomInAction = createAction('zoomInAction');
export const zoomOutAction = createAction('zoomOutAction');

export const setEditedBlockFieldsOnCurrentPositionAction =
    createAction<Partial<Block>>('setEditedBlockFieldsOnCurrentPositionAction');
export const setEditedElementFieldsAction =
    createAction<Partial<AnimationElementFieldsTypes<AnimationElementName>>>('setEditedElementFieldsAction');

export const setAnimationPositionAction =
    createAction<ConstructorState['animationPosition']>('setAnimationPositionAction');

export const setBlockScriptStepPositionAction =
    createAction<EditableStepPosition<BlockFieldUnits>>('setBlockScriptStepPositionAction');
export const setFieldsScriptStepPositionAction =
    createAction<EditableStepPosition<AnimationElementsFieldsUnits[AnimationElementName]>>('setFieldsScriptStepPositionAction');

export const setBlockScriptStepValueAction =
    createAction<EditableStepValue<BlockFieldUnits>>('setBlockScriptStepValueAction');
export const setFieldsScriptStepValueAction =
    createAction<EditableStepValue<AnimationElementsFieldsUnits[AnimationElementName]>>('setFieldsScriptStepValueAction');

export const removeBlockScriptStepAction =
    createAction<EditableStep<BlockFieldUnits>>('removeBlockScriptStepAction');
export const removeFieldsScriptStepAction =
    createAction<EditableStep<AnimationElementsFieldsUnits[AnimationElementName]>>('removeFieldsScriptStepAction');

export const addBlockScriptStepAction =
    createAction<AdditionalStep<BlockFieldUnits>>('addBlockScriptStepAction');
export const addFieldsScriptStepAction =
    createAction<AdditionalStep<AnimationElementsFieldsUnits[AnimationElementName]>>('addFieldsScriptStepAction');
