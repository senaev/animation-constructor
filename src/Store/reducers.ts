import { createReducer } from 'redux-act';
import { DefaultBlockScript } from '../Block/DefaultBlockScript';
import {
    actions,
} from './actions';
import { ZOOM_IN_STEP, ZOOM_OUT_STEP } from './const/ZOOM_STEP';
import { ConstructorStore } from './ConstructorStore';
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
    .on(actions.addStandardElement, (state, elementName): ConstructorStore => {
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
    .on(actions.selectBlock, (state, blockLocation): ConstructorStore => {
        return {
            ...state,
            editParams: blockLocation === undefined
                ? undefined
                : {
                    isMoving: true,
                    isResizing: false,
                    isRotating: false,
                    blockChangingPositionStepLocation: undefined,
                    blockLocation,
                },
        };
    })
    .on(actions.setEditedBlockMoving, (state, isMoving): ConstructorStore => {
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
    .on(actions.setEditedBlockResizing, (state, isResizing): ConstructorStore => {
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
    .on(actions.setEditedBlockRotating, (state, isRotating): ConstructorStore => {
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
    .on(actions.setEditedElementFields, (state, fieldsValues): ConstructorStore => {
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedElementFieldsAction should not be called without editParams');
        }

        return setAnimationElementFields(state, editParams.blockLocation, fieldsValues);
    })
    .on(actions.setEditedBlockFieldsOnCurrentPosition, (state, blockFields): ConstructorStore => {
        return setEditedBlockFieldsOnCurrentPosition(state, blockFields);
    })
    .on(actions.setAnimationPosition, (state, animationPosition): ConstructorStore => {
        return {
            ...state,
            animationPosition,
        };
    })
    .on(actions.setBlockScriptStepPosition, (state, {
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
    .on(actions.setFieldsScriptStepPosition, (state, {
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
    .on(actions.setBlockScriptStepValue, (state, {
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
    .on(actions.setFieldsScriptStepValue, (state, {
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
    .on(actions.setScaleCoordinates, (state, scaleCoordinates): ConstructorStore => {
        return {
            ...state,
            scaleCoordinates,
        };
    })
    .on(actions.zoomIn, (state): ConstructorStore => {
        const {
            zoom,
        } = state;

        return {
            ...state,
            zoom: zoom * ZOOM_OUT_STEP,
        };
    })
    .on(actions.zoomOut, (state): ConstructorStore => {
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
    .on(actions.removeFieldsScriptStep, (state, {
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
    .on(actions.addBlockScriptStep, (state, {
        fieldName,
        position,
    }): ConstructorStore => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = addScriptStepOnPosition(animationElementScript.blockScript, fieldName, position);


        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
        });
    }).on(actions.addFieldsScriptStep, (state, {
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
