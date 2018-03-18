import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { setStepValue } from './setStepValue';

export function setFieldsScriptsStepValue<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                          editedFieldName: keyof T,
                                                                          stepIndex: number,
                                                                          value: UnitTypes[T[keyof T]]): FieldsScripts<T> {
    return mapObjectValues(
        fieldsScript,
        (unitScript, fieldName) => {
            if (fieldName === editedFieldName) {
                const {
                    unit,
                    steps,
                } = unitScript;

                return {
                    unit,
                    steps: setStepValue(steps, stepIndex, value),
                };
            } else {
                return unitScript;
            }
        },
    );
}
