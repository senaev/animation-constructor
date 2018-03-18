import { getValueByPosition } from '../../Animation/util/getValueByPosition';
import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { addAction } from './addAction';

export function addScriptActionOnPosition<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                          editedFieldName: keyof T,
                                                                          position: number): FieldsScripts<T> {
    return mapObjectValues(
        fieldsScript,
        (unitScript, fieldName) => {
            if (fieldName === editedFieldName) {
                const {
                    unit,
                    actions,
                } = unitScript;

                const value = getValueByPosition(position, unit, actions);

                return {
                    unit,
                    actions: addAction(actions, position, value),
                };
            } else {
                return unitScript as any;
            }
        },
    );
}