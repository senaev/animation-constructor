import { UnitTypes } from '../../Unit/UnitTypes';
import { degreesToRadians } from './degreesToRadians';
import { Line } from './Types/Line';

export function getCrossingOriginLineByAngle(angle: UnitTypes['degree']): Line {
    return {
        k: Math.tan(degreesToRadians(angle)),
        b: 0,
    };
}
