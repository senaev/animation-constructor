import { createReducer } from 'redux-act';
import { AllAnimationElementsDescriptions } from '../../../AnimationElements/AllAnimationElementsDescriptions';
import { getElementDefaultFieldsValues } from '../../../AnimationElements/utils/getElementDefaultFieldsValues';
import { ALL_BLOCK_POSITION_FIELD_NAMES } from '../../../BlockPosition/ALL_BLOCK_POSITION_FIELD_NAMES';
import { BlockPositionFieldName } from '../../../BlockPosition/BlockPositionFieldName';
import { BlockPositionFieldUnits } from '../../../BlockPosition/BlockPositionFieldUnits';
import { BlockPositionFielsTypes } from '../../../BlockPosition/BlockPositionFielsTypes';
import { DEFAULT_BLOCK_POSITION } from '../../../BlockPosition/DEFAULT_BLOCK_POSITION';
import { Easing } from '../../../Easing/Easing';
import { ALL_FIELDS } from '../../../Fields/ALL_FIELDS';
import { FieldType } from '../../../Fields/FieldType';
import { Unit } from '../../../UnitName/Unit';
import { mapArrayValuesToObject } from '../../../utils/mapArrayValuesToObject';
import { mapObjectValues } from '../../../utils/mapObjectValues';
import {
    addStandardElementAction, discardChangesAction, saveElementAction, selectBlockAction,
    setAnimationPositionAction, setEditedElementFieldsAction, setEditedElementPositionAction, setRelationAction,
} from '../actions';
import { ConstructorState } from '../State';

export const createConstructorReducer = (appState: ConstructorState) => createReducer<ConstructorState>({}, appState)
    .on(addStandardElementAction, (state, elementName) => {
        return {
            ...state,
            editedElement: {
                blockLocation: undefined,
                elementName,
                position: DEFAULT_BLOCK_POSITION,
                fieldsValues: getElementDefaultFieldsValues(elementName),
                // animationElementScript: {
                //     elementName,
                //     blockPositionScript: DEFAULT_BLOCK_POSITION_SCRIPT,
                //     fieldsScript: getElementDefaultFieldsValues(elementName),
                // },
            },
        };
    })
    .on(selectBlockAction, (state, blockLocation) => {
        // const { animationScript } = state;
        //
        // // TODO: support recursive blocks
        // const [blockPosition] = blockLocation;

        // const [
        //     [blockToEdit],
        //     newAnimationScript,
        // ] = separate(animationScript, (animationElementScript, i) => i === blockPosition);

        return {
            ...state,
            // animationScript: newAnimationScript,
            // editedElement: null as any, // TODO,
        };
    })
    .on(saveElementAction, (state, {
        elementName,
        position,
        fieldsValues,
    }) => {
        const {
            animationScript,
        } = state;

        const blockPositionScript = mapArrayValuesToObject(
            ALL_BLOCK_POSITION_FIELD_NAMES,
            (blockPositionFieldName) => {

                const fieldType = BlockPositionFielsTypes[blockPositionFieldName];
                const { unit } = ALL_FIELDS[fieldType];

                return {
                    unit: unit as BlockPositionFieldUnits[BlockPositionFieldName],
                    actions: [{
                        duration: 0.3,
                        value: position[blockPositionFieldName],
                        // TODO
                        easingName: Easing.easeInOut,
                    }, {
                        duration: 0.3,
                        value: 100,
                        // TODO
                        easingName: Easing.easeInOut,
                    }, {
                        duration: 0.3,
                        value: 2,
                        // TODO
                        easingName: Easing.easeInOut,
                    }, {
                        duration: 0.1,
                        value: 70,
                        // TODO
                        easingName: Easing.easeInOut,
                    }],
                };
            },
        );

        const elementFieldsDescription = AllAnimationElementsDescriptions[elementName];
        const fieldsScript = mapObjectValues(fieldsValues, (fieldValue, fieldName) => {
            const { fieldType } = elementFieldsDescription[fieldName];
            const {
                unit,
                isSupportsEasing,
            } = ALL_FIELDS[fieldType as FieldType];

            return {
                // TODO: remove as
                unit: unit as Unit,
                actions: [{
                    duration: 1,
                    value: fieldValue,
                    // TODO
                    easingName: isSupportsEasing
                        ? Easing.easeInOut
                        : undefined,
                }],
            };
        });

        return {
            ...state,
            editedElement: undefined,
            animationScript: [
                ...animationScript,
                {
                    elementName,
                    blockPositionScript,
                    fieldsScript,
                },
            ],
        };
    })
    .on(discardChangesAction, (state) => {
        return {
            ...state,
            editedElement: undefined,
        };
    })
    .on(setRelationAction, (state, relation) => {
        return {
            ...state,
            relation,
        };
    })
    .on(setEditedElementFieldsAction, (state, fieldsValues) => {
        const { editedElement } = state;

        return {
            ...state,
            editedElement: editedElement
                ? {
                    ...editedElement,
                    fieldsValues,
                }
                : undefined,
        };
    })
    .on(setEditedElementPositionAction, (state, position) => {
        const { editedElement } = state;

        return {
            ...state,
            editedElement: editedElement
                ? {
                    ...editedElement,
                    position,
                }
                : undefined,
        };
    })
    .on(setAnimationPositionAction, (state, animationPosition) => {
        return {
            ...state,
            animationPosition,
        };
    });
