import { createAction } from 'redux-act';
import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { AnimationElementFieldsValues } from '../../../AnimationElements/AnimationElementsFieldsValues';
import { BlockLocation } from '../../../BlockLocation/BlockLocation';
import { BlockPosition, BlockSize, PointCoordinates } from '../../../BlockPosition/BlockPosition';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { ConstructorState } from '../State';

export const addStandardElementAction = createAction<AnimationElementName>('addStandardElementAction');
export const selectBlockAction = createAction<BlockLocation>('selectBlockAction');

export const saveElementAction = createAction('saveElementAction');
export const discardChangesAction = createAction('discardChangesAction');

export const setEditedBlockPositionAction = createAction<Partial<BlockPosition>>('setEditedElementPositionAction');
export const setEditedBlockCoordinatesAction = createAction<PointCoordinates>('setEditedBlockCoordinatesAction');
export const setEditedBlockSizeAction = createAction<BlockSize>('setEditedBlockSizeAction');
export const setEditedBlockRotationAction = createAction<UnitTypes[Unit.degree]>('setEditedBlockRotationAction');
export const setEditedElementFieldsAction = createAction<Partial<AnimationElementFieldsValues>>('setEditedElementFieldsAction');

export const setRelationAction = createAction<ConstructorState['relation']>('setRelationAction');

export const setAnimationPositionAction = createAction<ConstructorState['animationPosition']>('setAnimationPositionAction');
