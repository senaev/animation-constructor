import { createReducer } from 'redux-act';
import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../../AnimationScript';
import { DEFAULT_BLOCK_POSITION_SCRIPT } from '../../../BlockPosition/DEFAULT_BLOCK_POSITION_SCRIPT';
import {
    addStandardElementAction,
    completeBlockPositionScriptActionPositionChangeAction,
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
    setRelationAction,
} from '../actions';
import { ConstructorState } from '../State';
import { getDefaultFieldsScriptForAnimationElement } from '../utils/getDefaultFieldsScriptForAnimationElement';
import { getEditedAnimationElementScript } from '../utils/getEditedAnimationElementScript';
import { removeElement } from '../utils/removeElement';
import { setAnimationElementFields } from '../utils/setAnimationElementFields';
import { setBlockPositionFields } from '../utils/setBlockPositionFields';
import { setBlockPositionScriptActionPosition } from '../utils/setBlockPositionScriptActionPosition';
import { setEditedAnimationElementScript } from '../utils/setEditedAnimationElementScript';

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
                initialAnimationElementScript: getEditedAnimationElementScript(state),
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
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedBlockCoordinatesAction should not be called without editParams');
        }

        return setBlockPositionFields(state, editParams.blockLocation, pointCoordinates);
    })
    .on(setEditedBlockSizeAction, (state, blockSize): ConstructorState => {
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedBlockSizeAction should not be called without editParams');
        }

        return setBlockPositionFields(state, editParams.blockLocation, blockSize);
    })
    .on(setEditedBlockRotationAction, (state, blockRotation): ConstructorState => {
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedBlockRotationAction should not be called without editParams');
        }

        return setBlockPositionFields(state, editParams.blockLocation, { rotation: blockRotation });
    })
    .on(setEditedBlockPositionAction, (state, blockPositionFields): ConstructorState => {
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedBlockPositionAction should not be called without editParams');
        }

        return setBlockPositionFields(state, editParams.blockLocation, blockPositionFields);
    })
    .on(setAnimationPositionAction, (state, animationPosition): ConstructorState => {
        return {
            ...state,
            animationPosition,
        };
    })
    .on(setBlockPositionScriptActionPositionAction, (state, {
        blockPositionFieldName,
        actionIndex,
        position,
    }): ConstructorState => {
        return setBlockPositionScriptActionPosition(
            state,
            blockPositionFieldName,
            actionIndex,
            position,
        );
    })
    .on(completeBlockPositionScriptActionPositionChangeAction, (state, {
        blockPositionFieldName,
        actionIndex,
        position,
    }): ConstructorState => {
        // TODO
        return {
            ...state,
        };
    });
