import { createReducer } from 'redux-act';
import { DefaultBlockScript } from '../Block/DefaultBlockScript';
import {
    addBlockScriptStepAction,
    addFieldsScriptStepAction,
    addStandardElementAction,
    removeBlockScriptStepAction,
    removeFieldsScriptStepAction,
    selectBlockAction,
    setAnimationPositionAction,
    setBlockScriptStepPositionAction,
    setBlockScriptStepValueAction,
    setEditedBlockFieldsOnCurrentPositionAction,
    setEditedBlockMovingAction,
    setEditedBlockResizingAction,
    setEditedBlockRotatingAction,
    setEditedElementFieldsAction,
    setFieldsScriptStepPositionAction,
    setFieldsScriptStepValueAction,
    setScaleCoordinatesAction,
    zoomInAction,
    zoomOutAction,
} from './actions';
import { ZOOM_IN_STEP, ZOOM_OUT_STEP } from './const/ZOOM_STEP';
import { ConstructorStore } from './State';
import { addScriptStepOnPosition } from './utils/addScriptStepOnPosition';
import { getDefaultFieldsScriptForAnimationElement } from './utils/getDefaultFieldsScriptForAnimationElement';
import { getEditedAnimationElementScript } from './utils/getEditedAnimationElementScript';
import { removeFieldsScriptsStep } from './utils/removeFieldsScriptsStep';
import { setAnimationElementFields } from './utils/setAnimationElementFields';
import { setEditedAnimationElementScript } from './utils/setEditedAnimationElementScript';
import { setEditedBlockFieldsOnCurrentPosition } from './utils/setEditedBlockFieldsOnCurrentPosition';
import { setFieldsScriptsStepPosition } from './utils/setFieldsScriptsStepPosition';
import { setFieldsScriptsStepValue } from './utils/setFieldsScriptsStepValue';

export const createConstructorReducer = (appState: ConstructorStore) => createReducer<ConstructorStore>({}, appState)
    .on(addStandardElementAction, (state, elementName): ConstructorStore => {
        const {
            animationScript,
        } = state;

        const { length } = animationScript;

        return {
            ...state,
            editParams: {
                isMoving: false,
                isResizing: false,
                isRotating: false,
                changingPositionStep: undefined,
                blockLocation: [length],
            },
            animationScript: [
                ...animationScript,
                {
                    elementName,
                    blockScript: DefaultBlockScript,
                    fieldsScript: getDefaultFieldsScriptForAnimationElement(elementName),
                },
            ],
        };
    })
    .on(selectBlockAction, (state, blockLocation): ConstructorStore => {
        return {
            ...state,
            editParams: blockLocation === undefined
                ? undefined
                : {
                    isMoving: true,
                    isResizing: false,
                    isRotating: false,
                    changingPositionStep: undefined,
                    blockLocation,
                },
        };
    })
    .on(setEditedBlockMovingAction, (state, isMoving): ConstructorStore => {
        const {
            editParams,
        } = state;

        if (editParams === undefined) {
            throw new Error('editParams should not be undefined on setEditedBlockMovingAction dispatch');
        }

        return {
            ...state,
            editParams: {
                ...editParams,
                isMoving,
            },
        };
    })
    .on(setEditedBlockResizingAction, (state, isResizing): ConstructorStore => {
        const {
            editParams,
        } = state;

        if (editParams === undefined) {
            throw new Error('editParams should not be undefined on setEditedBlockMovingAction dispatch');
        }

        return {
            ...state,
            editParams: {
                ...editParams,
                isResizing,
            },
        };
    })
    .on(setEditedBlockRotatingAction, (state, isRotating): ConstructorStore => {
        const {
            editParams,
        } = state;

        if (editParams === undefined) {
            throw new Error('editParams should not be undefined on setEditedBlockMovingAction dispatch');
        }

        return {
            ...state,
            editParams: {
                ...editParams,
                isRotating,
            },
        };
    })
    .on(setEditedElementFieldsAction, (state, fieldsValues): ConstructorStore => {
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedElementFieldsAction should not be called without editParams');
        }

        return setAnimationElementFields(state, editParams.blockLocation, fieldsValues);
    })
    .on(setEditedBlockFieldsOnCurrentPositionAction, (state, blockFields): ConstructorStore => {
        return setEditedBlockFieldsOnCurrentPosition(state, blockFields);
    })
    .on(setAnimationPositionAction, (state, animationPosition): ConstructorStore => {
        return {
            ...state,
            animationPosition,
        };
    })
    .on(setBlockScriptStepPositionAction, (state, {
        fieldName,
        stepIndex,
        position,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = setFieldsScriptsStepPosition(
            animationElementScript.blockScript,
            fieldName,
            stepIndex,
            position,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
        });
    })
    .on(setFieldsScriptStepPositionAction, (state, {
        fieldName,
        stepIndex,
        position,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const fieldsScript = setFieldsScriptsStepPosition(
            animationElementScript.fieldsScript,
            fieldName,
            stepIndex,
            position,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            fieldsScript,
        });
    })
    .on(setBlockScriptStepValueAction, (state, {
        fieldName,
        stepIndex,
        value,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = setFieldsScriptsStepValue(
            animationElementScript.blockScript,
            fieldName,
            stepIndex,
            value,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
        });
    })
    .on(setFieldsScriptStepValueAction, (state, {
        fieldName,
        stepIndex,
        value,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const fieldsScript = setFieldsScriptsStepValue(
            animationElementScript.fieldsScript,
            fieldName,
            stepIndex,
            value,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            fieldsScript,
        });
    })
    .on(setScaleCoordinatesAction, (state, scaleCoordinates): ConstructorStore => {
        return {
            ...state,
            scaleCoordinates,
        };
    })
    .on(zoomInAction, (state): ConstructorStore => {
        const {
            zoom,
        } = state;

        return {
            ...state,
            zoom: zoom * ZOOM_OUT_STEP,
        };
    })
    .on(zoomOutAction, (state): ConstructorStore => {
        const {
            zoom,
        } = state;

        return {
            ...state,
            zoom: zoom * ZOOM_IN_STEP,
        };
    })
    .on(removeBlockScriptStepAction, (state, {
        fieldName,
        stepIndex,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = removeFieldsScriptsStep(
            animationElementScript.blockScript,
            fieldName,
            stepIndex,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
        });
    })
    .on(removeFieldsScriptStepAction, (state, {
        fieldName,
        stepIndex,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const fieldsScript = removeFieldsScriptsStep(
            animationElementScript.fieldsScript,
            fieldName,
            stepIndex,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            fieldsScript,
        });
    })
    .on(addBlockScriptStepAction, (state, {
        fieldName,
        position,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = addScriptStepOnPosition(animationElementScript.blockScript, fieldName, position);


        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
        });
    }).on(addFieldsScriptStepAction, (state, {
        fieldName,
        position,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const fieldsScript = addScriptStepOnPosition(animationElementScript.fieldsScript, fieldName, position);

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            fieldsScript,
        });
    });
