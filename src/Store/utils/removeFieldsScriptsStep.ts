import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { removeStep } from './removeStep';

export function removeFieldsScriptsStep<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                        editedFieldName: keyof T,
                                                                        stepIndex: number): FieldsScripts<T> {
    if (stepIndex === 0) {
        throw new Error('first step should not be removed');
    }

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
                    steps: removeStep(steps, stepIndex),
                };
            } else {
                return unitScript;
            }
        },
    );
}
