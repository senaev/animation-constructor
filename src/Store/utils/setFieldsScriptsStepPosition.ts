import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { setStepPosition } from './setStepPosition';

export function setFieldsScriptsStepPosition<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                             editedFieldName: keyof T,
                                                                             stepIndex: number,
                                                                             position: number): FieldsScripts<T> {
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
                    steps: setStepPosition(steps, stepIndex, position),
                };
            } else {
                return unitScript;
            }
        },
    );
}
