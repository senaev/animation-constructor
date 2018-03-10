import { createAction } from 'redux-act';
import { AnimationElementFieldsTypes } from '../../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { BlockLocation } from '../../../BlockLocation/BlockLocation';
import { BlockPosition } from '../../../BlockPosition/BlockPosition';
import { PointCoordinates } from '../../../types/PointCoordinates';
import { Size } from '../../../types/Size';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { ConstructorState } from '../State';
import { ActionPosition } from '../types/ActionPosition';

export const addStandardElementAction =
    createAction<AnimationElementName>('addStandardElementAction');
export const selectBlockAction =
    createAction<BlockLocation>('selectBlockAction');

export const saveElementAction =
    createAction('saveElementAction');
export const discardChangesAction =
    createAction('discardChangesAction');

export const setEditedBlockPositionAction =
    createAction<Partial<BlockPosition>>('setEditedElementPositionAction');
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

export const setBlockPositionScriptActionPositionAction =
    createAction<ActionPosition>('setBlockPositionScriptActionPositionAction');
