import { UnitScripts } from '../../../AnimationScript';
import { UnitName } from '../../../Unit/UNIT_NAMES';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import { mapArrayValuesToObject } from '../../../utils/mapArrayValuesToObject';
import { getValueByPosition } from '../getValueByPosition';

export function createFieldsFunctionByUnitScripts<T extends Record<string,
    UnitName>>(unitScripts: UnitScripts<T>): (position: number) => T {
    const allFieldNames = getObjectKeys(unitScripts);

    return (newPosition: number) => {
        return mapArrayValuesToObject(allFieldNames, (fieldName) => {
            const {
                actions,
                unit,
            } = unitScripts[fieldName];

            const { length } = actions;

            if (length === 0) {
                throw new Error(`No actions in animation script [${fieldName}][${unit}]`);
            } else {
                return getValueByPosition(newPosition, unit, actions);
            }
        }) as T;
    };
}
