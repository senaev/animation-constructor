import { UnitTypes } from '../../Unit/UnitTypes';

export function radiansToDegres(radians: number): UnitTypes['degree'] {
    return radians * 180 / Math.PI;
}
