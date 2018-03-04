import { createReducer } from 'redux-act';
import { AnimationElementScript } from '../../../AnimationScript';
import { getDefaultFieldsScriptForAnimationElement } from '../../utils/getDefaultFieldsScriptForAnimationElement';
import { DEFAULT_BLOCK_POSITION_SCRIPT } from '../../../BlockPosition/DEFAULT_BLOCK_POSITION_SCRIPT';
import { getAnimationElementScript } from '../../utils/getAnimationElementScript';
import { removeElement } from '../../utils/removeElement';
import { setAnimationElementFields } from '../../utils/setAnimationElementFields';
import { setAnimationElementScript } from '../../utils/setAnimationElementScript';
import { setBlockPositionFields } from '../../utils/setBlockPositionFields';
import {
    addStandardElementAction, discardChangesAction, saveElementAction, selectBlockAction, setAnimationPositionAction,
    setEditedBlockCoordinatesAction,
    setEditedBlockPositionAction, setEditedBlockRotationAction, setEditedBlockSizeAction, setEditedElementFieldsAction,
    setRelationAction,
} from '../actions';
import { ConstructorState } from '../State';

export const createConstructorReducer = (appState: ConstructorState) => createReducer<ConstructorState>({}, appState)
    .on(addStandardElementAction, (state, elementName): ConstructorState => {
        const {
            animationScript,
        } = state;

        const { length } = animationScript;

        const initialAnimationElementScript: AnimationElementScript = {
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
                initialAnimationElementScript: getAnimationElementScript(state, blockLocation),
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
                ...setAnimationElementScript(state, blockLocation, initialAnimationElementScript),
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
    });
