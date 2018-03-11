import { createAction } from 'redux-act';
import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { Block } from '../../Block/Block';
import { BlockFieldUnits } from '../../Block/BlockFieldUnits';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { ConstructorState } from '../State';
import { ActionPosition } from '../types/ActionPosition';
import { ActionValue } from '../types/ActionValue';

export const addStandardElementAction =
    createAction<AnimationElementName>('addStandardElementAction');
export const selectBlockAction =
    createAction<BlockLocation>('selectBlockAction');

export const saveElementAction =
    createAction('saveElementAction');
export const discardChangesAction =
    createAction('discardChangesAction');

export const setEditedBlockFieldsAction =
    createAction<Partial<Block>>('setEditedBlockFieldsAction');
export const setEditedBlockCoordinatesAction =
    createAction<PointCoordinates>('setEditedBlockCoordinatesAction');
export const setEditedBlockSizeAction =
    createAction<Size>('setEditedBlockSizeAction');
export const setEditedBlockRotationAction =
    createAction<UnitTypes[Unit.degree]>('setEditedBlockRotationAction');
export const setEditedElementFieldsAction =
    createAction<Partial<AnimationElementFieldsTypes<AnimationElementName>>>('setEditedElementFieldsAction');

export const setRelationAction =
    createAction<ConstructorState['relation']>('setRelationAction');

export const setAnimationPositionAction =
    createAction<ConstructorState['animationPosition']>('setAnimationPositionAction');

export const setBlockScriptActionPositionAction =
    createAction<ActionPosition<BlockFieldUnits>>('setBlockScriptActionPositionAction');
export const setFieldsScriptActionPositionAction =
    createAction<ActionPosition<AnimationElementsFieldsUnits[AnimationElementName]>>('setFieldsScriptActionPositionAction');

export const setBlockScriptActionValueAction =
    createAction<ActionValue<BlockFieldUnits>>('setBlockScriptActionValueAction');
export const setFieldsScriptActionValueAction =
    createAction<ActionValue<AnimationElementsFieldsUnits[AnimationElementName]>>('setFieldsScriptActionValueAction');
