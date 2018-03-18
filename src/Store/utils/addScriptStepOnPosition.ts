import { getValueByPosition } from '../../Animation/util/getValueByPosition';
import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { addStep } from './addStep';

export function addScriptStepOnPosition<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                        editedFieldName: keyof T,
                                                                        position: number): FieldsScripts<T> {
    return mapObjectValues(
        fieldsScript,
        (unitScript, fieldName) => {
            if (fieldName === editedFieldName) {
                const {
                    unit,
                    steps,
                } = unitScript;

                const value = getValueByPosition(position, unit, steps);

                return {
                    unit,
                    steps: addStep(steps, position, value),
                };
            } else {
                return unitScript;
            }
        },
    );
}