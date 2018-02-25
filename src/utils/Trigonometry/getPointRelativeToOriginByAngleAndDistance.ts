import { PointCoordinates } from '../../BlockPosition/BlockPosition';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { degreesToRadians } from './degreesToRadians';

export function getPointRelativeToOriginByAngleAndDistance(distance: number,
                                                           angle: UnitTypes[Unit.degree]): PointCoordinates {
    const radians = degreesToRadians(angle);

    return {
        x: distance * Math.cos(radians),
        y: distance * Math.sin(radians),
    };
}
