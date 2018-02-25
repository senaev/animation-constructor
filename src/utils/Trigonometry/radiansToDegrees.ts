import { Unit } from '../../UnitName/Unit';
import { UnitTypes } from '../../UnitName/UnitTypes';

export function radiansToDegres(radians: number): UnitTypes[Unit.degree] {
    return radians * 180 / Math.PI;
}
