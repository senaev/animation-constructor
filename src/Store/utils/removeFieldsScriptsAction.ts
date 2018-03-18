import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { removeAction } from './removeAction';

export function removeFieldsScriptsAction<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                          editedFieldName: keyof T,
                                                                          actionIndex: number): FieldsScripts<T> {
    if (actionIndex === 0) {
        throw new Error('first action should not be removed');
    }

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
                    actions: removeAction(actions, actionIndex),
                };
            } else {
                return unitScript as any;
            }
        },
    );
}
