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
    setBlockPositionScriptActionPositionAction, setBlockPositionScriptActionValueAction,
    setEditedBlockCoordinatesAction,
    setEditedBlockPositionAction,
    setEditedBlockRotationAction,
    setEditedBlockSizeAction,
    setEditedElementFieldsAction,
    setFieldsScriptActionPositionAction, setFieldsScriptActionValueAction,
    setRelationAction,
} from '../actions';
import { ConstructorState } from '../State';
import { getAnimationElementScriptByBlockLocation } from '../utils/getAnimationElementScriptByBlockLocation';
import { getDefaultFieldsScriptForAnimationElement } from '../utils/getDefaultFieldsScriptForAnimationElement';
import { getEditedAnimationElementScript } from '../utils/getEditedAnimationElementScript';
import { removeElement } from '../utils/removeElement';
import { setAnimationElementFields } from '../utils/setAnimationElementFields';
import { setEditedAnimationElementScript } from '../utils/setEditedAnimationElementScript';
import { setEditedBlockPositionFields } from '../utils/setEditedBlockPositionFields';
import { setFieldsScriptsActionPosition } from '../utils/setFieldsScriptsActionPosition';
import { setFieldsScriptsActionValue } from '../utils/setFieldsScriptsActionValue';

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
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockPositionScript = setFieldsScriptsActionPosition(
            animationElementScript.blockPositionScript,
            fieldName,
            actionIndex,
            position,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockPositionScript,
        });
    })
    .on(setFieldsScriptActionPositionAction, (state, {
        fieldName,
        actionIndex,
        position,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const fieldsScript = setFieldsScriptsActionPosition(
            animationElementScript.fieldsScript,
            fieldName,
            actionIndex,
            position,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            fieldsScript,
        });
    })
    .on(setBlockPositionScriptActionValueAction, (state, {
        fieldName,
        actionIndex,
        value,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockPositionScript = setFieldsScriptsActionValue(
            animationElementScript.blockPositionScript,
            fieldName,
            actionIndex,
            value,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockPositionScript,
        });
    })
    .on(setFieldsScriptActionValueAction, (state, {
        fieldName,
        actionIndex,
        value,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const fieldsScript = setFieldsScriptsActionValue(
            animationElementScript.fieldsScript,
            fieldName,
            actionIndex,
            value,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            fieldsScript,
        });
    });
