import { FieldsScripts } from '../../AnimationScript';
import { Easing } from '../../Easing/Easing';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { setStepEasing } from './setStepEasing';

export function setFieldsScriptsStepEasing<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                           editedFieldName: keyof T,
                                                                           stepIndex: number,
                                                                           easing: Easing | undefined): FieldsScripts<T> {
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
                    steps: setStepEasing(steps, stepIndex, easing),
                };
            } else {
                return unitScript;
            }
        },
    );
}
