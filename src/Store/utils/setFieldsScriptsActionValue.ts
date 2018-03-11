import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { setActionValue } from './setActionValue';

export function setFieldsScriptsActionValue<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                            editedFieldName: keyof T,
                                                                            actionIndex: number,
                                                                            value: UnitTypes[T[keyof T]]): FieldsScripts<T> {
    return mapObjectValues(
        fieldsScript,
        (unitScript, fieldName) => {
            if (fieldName === editedFieldName) {
                const {
                    unit,
                    actions,
                } = unitScript;

                return {
                    unit,
                    actions: setActionValue(actions, actionIndex, value),
                };
            } else {
                return unitScript as any;
            }
        },
    );
}
