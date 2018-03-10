import { FieldsScripts } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { setActionPosition } from './setActionPosition';

export function setFieldsScriptsActionPosition<T extends Record<string, Unit>>(fieldsScript: FieldsScripts<T>,
                                                                               editedFieldName: keyof T,
                                                                               actionIndex: number,
                                                                               position: number): FieldsScripts<T> {
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
                    actions: setActionPosition(actions, actionIndex, position),
                };
            } else {
                return unitScript as any;
            }
        },
    );
}
