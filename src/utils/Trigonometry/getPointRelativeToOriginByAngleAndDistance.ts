import { PointCoordinates } from '../../BlockPosition/BlockPosition';
import { Unit } from '../../UnitName/Unit';
import { UnitTypes } from '../../UnitName/UnitTypes';
import { degreesToRadians } from './degreesToRadians';

export function getPointRelativeToOriginByAngleAndDistance(distance: number,
                                                           angle: UnitTypes[Unit.degree]): PointCoordinates {
    const radians = degreesToRadians(angle);

    return {
        x: distance * Math.cos(radians),
        y: distance * Math.sin(radians),
    };
}
