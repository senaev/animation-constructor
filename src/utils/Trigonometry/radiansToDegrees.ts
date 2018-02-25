import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export function radiansToDegres(radians: number): UnitTypes[Unit.degree] {
    return radians * 180 / Math.PI;
}
