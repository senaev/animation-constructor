import { UnitScripts } from '../../../AnimationScript';
import { Unit } from '../../../Unit/Unit';
import { UnitsToTypes } from '../../../Unit/UnitsToTypes';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import { mapArrayValuesToObject } from '../../../utils/mapArrayValuesToObject';
import { getValueByPosition } from '../getValueByPosition';

export function createFieldsFunctionByUnitScripts<T extends Record<string, Unit>>
(unitScripts: UnitScripts<T>): (position: number) => UnitsToTypes<T> {
    const allFieldNames = getObjectKeys(unitScripts);

    return (newPosition: number) => {
        return mapArrayValuesToObject(allFieldNames, (fieldName) => {
            const unitScript = unitScripts[fieldName];

            const {
                unit,
                actions,
            } = unitScript;

            const { length } = actions;

            if (length === 0) {
                throw new Error(`No actions in animation script [${fieldName}][${unit}]`);
            } else {
                return getValueByPosition(newPosition, unit, actions);
            }
        });
    };
}
