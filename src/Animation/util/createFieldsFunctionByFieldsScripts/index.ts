import { FieldsScripts } from '../../../AnimationScript';
import { Unit } from '../../../Unit/Unit';
import { UnitsToTypes } from '../../../Unit/UnitsToTypes';
import { getFieldsValuesByPosition } from '../getFieldsValuesByPosition';

export function createFieldsFunctionByFieldsScripts<T extends Record<string, Unit>>
(fieldsScripts: FieldsScripts<T>): (position: number) => UnitsToTypes<T> {
    return (position: number) => getFieldsValuesByPosition(position, fieldsScripts);
}
