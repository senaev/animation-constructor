import { createReducer } from 'redux-act';
import { DefaultBlockScript } from '../Block/DefaultBlockScript';
import {
    addStandardElementAction,
    setAnimationPositionAction,
    setBlockScriptActionPositionAction,
    setBlockScriptActionValueAction,
    setEditedBlockAction,
    setEditedBlockFieldsOnCurrentPositionAction,
    setEditedElementFieldsAction,
    setFieldsScriptActionPositionAction,
    setFieldsScriptActionValueAction,
    setScaleCoordinatesAction,
    zoomInAction,
    zoomOutAction,
} from './actions/index';
import { ZOOM_IN_STEP, ZOOM_OUT_STEP } from './const/ZOOM_STEP';
import { ConstructorState } from './State';
import { getDefaultFieldsScriptForAnimationElement } from './utils/getDefaultFieldsScriptForAnimationElement';
import { getEditedAnimationElementScript } from './utils/getEditedAnimationElementScript';
import { setAnimationElementFields } from './utils/setAnimationElementFields';
import { setEditedAnimationElementScript } from './utils/setEditedAnimationElementScript';
import { setEditedBlockFieldsOnCurrentPosition } from './utils/setEditedBlockFieldsOnCurrentPosition';
import { setFieldsScriptsActionPosition } from './utils/setFieldsScriptsActionPosition';
import { setFieldsScriptsActionValue } from './utils/setFieldsScriptsActionValue';

export const createConstructorReducer = (appState: ConstructorState) => createReducer<ConstructorState>({}, appState)
    .on(addStandardElementAction, (state, elementName): ConstructorState => {
        const {
            animationScript,
        } = state;

        const { length } = animationScript;

        return {
            ...state,
            editParams: {
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
    .on(setEditedBlockAction, (state, blockLocation): ConstructorState => {
        return {
            ...state,
            editParams: blockLocation === undefined
                ? undefined
                : {
                    blockLocation,
                },
        };
    })
    .on(setEditedElementFieldsAction, (state, fieldsValues): ConstructorState => {
        const { editParams } = state;

        if (editParams === undefined) {
            throw new Error('setEditedElementFieldsAction should not be called without editParams');
        }

        return setAnimationElementFields(state, editParams.blockLocation, fieldsValues);
    })
    .on(setEditedBlockFieldsOnCurrentPositionAction, (state, blockFields): ConstructorState => {
        return setEditedBlockFieldsOnCurrentPosition(state, blockFields);
    })
    .on(setAnimationPositionAction, (state, animationPosition): ConstructorState => {
        return {
            ...state,
            animationPosition,
        };
    })
    .on(setBlockScriptActionPositionAction, (state, {
        fieldName,
        actionIndex,
        position,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = setFieldsScriptsActionPosition(
            animationElementScript.blockScript,
            fieldName,
            actionIndex,
            position,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
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
    .on(setBlockScriptActionValueAction, (state, {
        fieldName,
        actionIndex,
        value,
    }): ConstructorState => {
        const animationElementScript = getEditedAnimationElementScript(state);

        const blockScript = setFieldsScriptsActionValue(
            animationElementScript.blockScript,
            fieldName,
            actionIndex,
            value,
        );

        return setEditedAnimationElementScript(state, {
            ...animationElementScript,
            blockScript,
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
    })
    .on(setScaleCoordinatesAction, (state, scaleCoordinates): ConstructorState => {
        return {
            ...state,
            scaleCoordinates,
        };
    })
    .on(zoomInAction, (state): ConstructorState => {
        const {
            zoom,
        } = state;

        return {
            ...state,
            zoom: zoom * ZOOM_OUT_STEP,
        };
    })
    .on(zoomOutAction, (state): ConstructorState => {
        const {
            zoom,
        } = state;

        return {
            ...state,
            zoom: zoom * ZOOM_IN_STEP,
        };
    });
