import { PointCoordinates } from '../../types/PointCoordinates';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { radiansToDegres } from './radiansToDegrees';

export function getAngleRelativeToOrigin({ x, y }: PointCoordinates): UnitTypes[Unit.degree] {
    const tan = y / x;
    const relativeRotation = radiansToDegres(Math.atan(tan));

    const deviation = x > 0
        ? y > 0
            ? 0
            : 360
        : 180;

    return deviation + relativeRotation;
}
