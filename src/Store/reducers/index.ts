import { createReducer } from 'redux-act';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { DEFAULT_BLOCK_POSITION_SCRIPT } from '../../BlockPosition/DEFAULT_BLOCK_POSITION_SCRIPT';
import {
    addStandardElementAction,
    discardChangesAction,
    saveElementAction,
    selectBlockAction,
    setAnimationPositionAction,
    setBlockPositionScriptActionPositionAction,
    setEditedBlockCoordinatesAction,
    setEditedBlockPositionAction,
    setEditedBlockRotationAction,
    setEditedBlockSizeAction,
    setEditedElementFieldsAction,
    setFieldsScriptActionPositionAction,
    setRelationAction,
} from '../actions';
import { ConstructorState } from '../State';
import { getAnimationElementScriptByBlockLocation } from '../utils/getAnimationElementScriptByBlockLocation';
import { getDefaultFieldsScriptForAnimationElement } from '../utils/getDefaultFieldsScriptForAnimationElement';
import { removeElement } from '../utils/removeElement';
import { setAnimationElementFields } from '../utils/setAnimationElementFields';
import { setBlockPositionScriptActionPosition } from '../utils/setBlockPositionScriptActionPosition';
import { setEditedAnimationElementScript } from '../utils/setEditedAnimationElementScript';
import { setEditedBlockPositionFields } from '../utils/setEditedBlockPositionFields';
import { setFieldsScriptActionPosition } from '../utils/setFieldsScriptActionPosition';

export const createConstructorReducer = (appState: ConstructorState) => createReducer<ConstructorState>({}, appState)
    .on(addStandardElementAction, (state, elementName): ConstructorState => {
        const {
            animationScript,
        } = state;

        const { length } = animationScript;

        const initialAnimationElementScript: AnimationElementScript<AnimationElementName> = {
            elementName,
            blockPositionScript: DEFAULT_BLOCK_POSITION_SCRIPT,
            fieldsScript: getDefaultFieldsScriptForAnimationElement(elementName),
        };

        return {
            ...state,
            editParams: {
                isNewElement: true,
                blockLocation: [length],
                initialAnimationElementScript,
            },
            animationScript: [
                ...animationScript,
                {
                    elementName,
                    blockPositionScript: DEFAULT_BLOCK_POSITION_SCRIPT,
                    fieldsScript: getDefaultFieldsScriptForAnimationElement(elementName),
                },
            ],
        };
    })
    .on(selectBlockAction, (state, blockLocation): ConstructorState => {
        return {
            ...state,
            editParams: {
                isNewElement: false,
                blockLocation,
                initialAnimationElementScript: getAnimationElementScriptByBlockLocation(state, blockLocation),
            },
        };
    })
    .on(saveElementAction, (state): ConstructorState => {
        return {
            ...state,
            editParams: undefined,
        };
    })
    .on(discardChangesAction, (state): ConstructorState => {
        const {
            editParams,
        } = state;

        if (editParams === undefined) {
            throw new Error('editParams should not be undefined no discardChangesAction');
        }

        const {
            isNewElement,
            blockLocation,
            initialAnimationElementScript,
        } = editParams;

        if (isNewElement) {
            return {
                ...removeElement(state, blockLocation),
                editParams: undefined,
            };
        } else {
            return {
                ...setEditedAnimationElementScript(state, initialAnimationElementScript),
                editParams: undefined,
            };
        }
    })
    .on(setRelationAction, (state, relation): ConstructorState => {
        return {
            ...state,
            relation,
        };
    })
    .on(setEditedElementFieldsAction, (state, fieldsValues): ConstructorState => {
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedElementFieldsAction should not be called without editParams');
        }

        return setAnimationElementFields(state, editParams.blockLocation, fieldsValues);
    })
    .on(setEditedBlockCoordinatesAction, (state, pointCoordinates): ConstructorState => {
        return setEditedBlockPositionFields(state, pointCoordinates);
    })
    .on(setEditedBlockSizeAction, (state, blockSize): ConstructorState => {
        return setEditedBlockPositionFields(state, blockSize);
    })
    .on(setEditedBlockRotationAction, (state, blockRotation): ConstructorState => {
        return setEditedBlockPositionFields(state, { rotation: blockRotation });
    })
    .on(setEditedBlockPositionAction, (state, blockPositionFields): ConstructorState => {
        return setEditedBlockPositionFields(state, blockPositionFields);
    })
    .on(setAnimationPositionAction, (state, animationPosition): ConstructorState => {
        return {
            ...state,
            animationPosition,
        };
    })
    .on(setBlockPositionScriptActionPositionAction, (state, {
        fieldName,
        actionIndex,
        position,
    }): ConstructorState => {
        return setBlockPositionScriptActionPosition(
            state,
            fieldName,
            actionIndex,
            position,
        );
    })
    .on(setFieldsScriptActionPositionAction, (state, {
        fieldName,
        actionIndex,
        position,
    }): ConstructorState => {
        return setFieldsScriptActionPosition(
            state,
            fieldName,
            actionIndex,
            position,
        );
    });
