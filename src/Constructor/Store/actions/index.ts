import { createAction } from 'redux-act';
import { AnimationElementFieldsTypes } from '../../../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { BlockLocation } from '../../../BlockLocation/BlockLocation';
import { BlockPosition } from '../../../BlockPosition/BlockPosition';
import { ConstructorState, EditedElement } from '../State';

export const addStandardElementAction = createAction<AnimationElementName>('addStandardElementAction');
export const selectBlockAction = createAction<BlockLocation>('selectBlockAction');

export const saveElementAction = createAction<EditedElement>('saveElementAction');
export const discardChangesAction = createAction('discardChangesAction');

export const setEditedElementPositionAction = createAction<BlockPosition>('setEditedElementPositionAction');
export const setEditedElementFieldsAction = createAction<AnimationElementFieldsTypes>('setEditedElementFieldsAction');

export const setRelationAction = createAction<ConstructorState['relation']>('setRelationAction');

export const setAnimationPositionAction =
    createAction<ConstructorState['animationPosition']>('setAnimationPositionAction');
