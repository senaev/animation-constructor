import { createAction } from 'redux-act';
import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { Block } from '../../Block/Block';
import { BlockFieldUnits } from '../../Block/BlockFieldUnits';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { PointCoordinates } from '../../types/PointCoordinates';
import { ConstructorState } from '../State';
import { ActionPosition } from '../types/ActionPosition';
import { ActionValue } from '../types/ActionValue';

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

export const setBlockScriptActionPositionAction =
    createAction<ActionPosition<BlockFieldUnits>>('setBlockScriptActionPositionAction');
export const setFieldsScriptActionPositionAction =
    createAction<ActionPosition<AnimationElementsFieldsUnits[AnimationElementName]>>('setFieldsScriptActionPositionAction');

export const setBlockScriptActionValueAction =
    createAction<ActionValue<BlockFieldUnits>>('setBlockScriptActionValueAction');
export const setFieldsScriptActionValueAction =
    createAction<ActionValue<AnimationElementsFieldsUnits[AnimationElementName]>>('setFieldsScriptActionValueAction');
