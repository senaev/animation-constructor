import { createReducer } from 'redux-act';
import { DefaultBlockScript } from '../Block/DefaultBlockScript';
import { actions, } from './actions';
import { ZOOM_IN_STEP, ZOOM_OUT_STEP } from './const/ZOOM_STEP';
import { ConstructorState } from './ConstructorState';
import { addScriptStepOnPosition } from './utils/addScriptStepOnPosition';
import { getDefaultFieldsScriptForAnimationElement } from './utils/getDefaultFieldsScriptForAnimationElement';
import { getEditedAnimationElementScript } from './utils/getEditedAnimationElementScript';
import { removeFieldsScriptsStep } from './utils/removeFieldsScriptsStep';
import { setAnimationElementFields } from './utils/setAnimationElementFields';
import { setEditedAnimationElementScript } from './utils/setEditedAnimationElementScript';
import { setEditedBlockFieldsOnCurrentPosition } from './utils/setEditedBlockFieldsOnCurrentPosition';
import { setFieldsScriptsStepEasing } from './utils/setFieldsScriptsStepEasing';
import { setFieldsScriptsStepPosition } from './utils/setFieldsScriptsStepPosition';
import { setFieldsScriptsStepValue } from './utils/setFieldsScriptsStepValue';

export const createConstructorReducer = (appState: ConstructorState) => createReducer<ConstructorState>({}, appState)
    .on(actions.addStandardElement, (state, elementName): ConstructorState => {
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
                blockChangingPositionStepLocation: undefined,
                elementFieldChangingPositionStepLocation: undefined,
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
    .on(actions.selectBlock, (state, blockLocation): ConstructorState => {
        return {
            ...state,
            editParams: blockLocation === undefined
                ? undefined
                : {
                    isMoving: true,
                    isResizing: false,
                    isRotating: false,
                    blockChangingPositionStepLocation: undefined,
                    elementFieldChangingPositionStepLocation: undefined,
                    blockLocation,
                },
        };
    })
    .on(actions.setEditedBlockMoving, (state, isMoving): ConstructorState => {
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
    .on(actions.setEditedBlockResizing, (state, isResizing): ConstructorState => {
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
    .on(actions.setEditedBlockRotating, (state, isRotating): ConstructorState => {
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
    .on(actions.setEditedElementFields, (state, fieldsValues): ConstructorState => {
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedElementFieldsAction should not be called without editParams');
        }

        return setAnimationElementFields(state, editParams.blockLocation, fieldsValues);
    })
    .on(actions.setEditedBlockFieldsOnCurrentPosition, (state, blockFields): ConstructorState => {
        return setEditedBlockFieldsOnCurrentPosition(state, blockFields);
    })
    .on(actions.setAnimationPosition, (state, animationPosition): ConstructorState => {
        return {
            ...state,
            animationPosition,
        };
    })
    .on(actions.setBlockScriptStepPosition, (state, {
        fieldName,
        stepIndex,
        position,
    }): ConstructorState => {
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
    .on(actions.setFieldsScriptStepPosition, (state, {
        fieldName,
        stepIndex,
        position,
    }): ConstructorState => {
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
    .on(actions.setBlockScriptStepValue, (state, {
        fieldName,
        stepIndex,
        value,
    }): ConstructorState => {
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
    .on(actions.setFieldsScriptStepValue, (state, {
        fieldName,
        stepIndex,
        value,
    }): ConstructorState => {
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
    .on(actions.setBlockScriptStepEasing, (state, {
        fieldName,
        stepIndex,
        easing,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = setFieldsScriptsStepEasing(
            animationElementScript.blockScript,
            fieldName,
            stepIndex,
            easing,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
        });
    })
    .on(actions.setFieldsScriptStepEasing, (state, {
        fieldName,
        stepIndex,
        easing,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const fieldsScript = setFieldsScriptsStepEasing(
            animationElementScript.fieldsScript,
            fieldName,
            stepIndex,
            easing,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            fieldsScript,
        });
    })
    .on(actions.setScaleCoordinates, (state, scaleCoordinates): ConstructorState => {
        return {
            ...state,
            scaleCoordinates,
        };
    })
    .on(actions.zoomIn, (state): ConstructorState => {
        const {
            zoom,
        } = state;

        return {
            ...state,
            zoom: zoom * ZOOM_OUT_STEP,
        };
    })
    .on(actions.zoomOut, (state): ConstructorState => {
        const {
            zoom,
        } = state;

        return {
            ...state,
            zoom: zoom * ZOOM_IN_STEP,
        };
    })
    .on(actions.removeBlockScriptStep, (state, {
        fieldName,
        stepIndex,
    }): ConstructorState => {
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
    .on(actions.removeFieldsScriptStep, (state, {
        fieldName,
        stepIndex,
    }): ConstructorState => {
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
    .on(actions.addBlockScriptStep, (state, {
        fieldName,
        position,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = addScriptStepOnPosition(animationElementScript.blockScript, fieldName, position);

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
        });
    })
    .on(actions.addFieldsScriptStep, (state, {
        fieldName,
        position,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const fieldsScript = addScriptStepOnPosition(animationElementScript.fieldsScript, fieldName, position);

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            fieldsScript,
        });
    })
    .on(actions.setBlockChangingPositionStepLocation, (state, blockChangingPositionStepLocation): ConstructorState => {
        const {
            editParams,
        } = state;

        if (editParams === undefined) {
            throw new Error('editParams should not be undefined on setBlockChangingPositionStepLocation dispatch');
        }

        return {
            ...state,
            editParams: {
                ...editParams,
                blockChangingPositionStepLocation,
            },
        };
    })
    .on(actions.setElementFieldsChangingPositionStepLocation, (state, elementFieldChangingPositionStepLocation): ConstructorState => {
        const {
            editParams,
        } = state;

        if (editParams === undefined) {
            throw new Error('editParams should not be undefined on setElementFieldsChangingPositionStepLocation dispatch');
        }

        return {
            ...state,
            editParams: {
                ...editParams,
                elementFieldChangingPositionStepLocation,
            },
        };
    })
    .on(actions.startEditingJSON, (state): ConstructorState => {
        return {
            ...state,
            editingAsJSONParams: {},
        };
    })
    .on(actions.cancelEditingJSON, (state): ConstructorState => {
        return {
            ...state,
            editingAsJSONParams: undefined,
        };
    })
    .on(actions.saveAnimationScript, (state, animationScript): ConstructorState => {
        return {
            ...state,
            animationScript,
            editingAsJSONParams: undefined,
        };
    });
