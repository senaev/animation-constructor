import { FieldsScripts } from '../../../AnimationScript';
import { Unit } from '../../../Unit/Unit';
import { UnitsToTypes } from '../../../Unit/UnitsToTypes';
import { mapObjectValues } from '../../../utils/mapObjectValues';
import { getValueByPosition } from '../getValueByPosition';

export function getFieldsValuesByPosition<T extends Record<string, Unit>>
(position: number,
 fieldsScripts: FieldsScripts<T>): UnitsToTypes<T> {
    return mapObjectValues(fieldsScripts, ({ unit, steps }, fieldName) => {
        if (steps.length === 0) {
            throw new Error(`No steps in animation script [${fieldName}][${unit}]`);
        } else {
            return getValueByPosition(position, unit, steps);
        }
    });
}
