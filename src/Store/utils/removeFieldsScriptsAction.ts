import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { removeElementFromArray } from '../../utils/removeElementFromArray';

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

                const replacedPrevious = actions.map((action, i) => {
                    if (i === actionIndex - 1) {
                        return {
                            ...action,
                            duration: actions[i].duration + actions[actionIndex].duration,
                        };
                    } else {
                        return action;
                    }
                });

                return {
                    unit,
                    actions: removeElementFromArray(replacedPrevious, actionIndex),
                };
            } else {
                return unitScript as any;
            }
        },
    );
}
