import { Unit } from '../../UnitName/Unit';
import { UnitTypes } from '../../UnitName/UnitTypes';
import { degreesToRadians } from './degreesToRadians';
import { Line } from './Line';

export function getCrossingOriginLineByAngle(angle: UnitTypes[Unit.degree]): Line {
    return {
        k: Math.tan(degreesToRadians(angle)),
        b: 0,
    };
}
