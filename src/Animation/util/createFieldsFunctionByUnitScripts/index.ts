import { UnitScripts } from '../../../AnimationScript';
import { UnitName } from '../../../Unit/UNIT_NAMES';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import { mapArrayValuesToObject } from '../../../utils/mapArrayValuesToObject';
import { getValueByPosition } from '../getValueByPosition';

export function createFieldsFunctionByUnitScripts(unitScripts: UnitScripts): (position: number) => Record<string, UnitTypes[UnitName]> {
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
        });
    };
}
