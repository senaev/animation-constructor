import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { degreesToRadians } from './degreesToRadians';
import { Line } from './Line';

export function getCrossingOriginLineByAngle(angle: UnitTypes[Unit.degree]): Line {
    return {
        k: Math.tan(degreesToRadians(angle)),
        b: 0,
    };
}
