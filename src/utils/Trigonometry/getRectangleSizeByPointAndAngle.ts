import { BlockSize, PointCoordinates } from '../../BlockPosition/BlockPosition';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { getDistanceBetweenTwoPoints } from './getDistanceBetweenTwoPoints';
import { getDistanceFromOrigin } from './getDistanceFromOrigin';
import { getIntersectionOfLineFromOriginAndItsPerpendicularByPoint } from './getPerpendicularLinesIntersection';
import { isPointInFrontOfOriginVector } from './isPointInFrontOfVector';

export function getRectangleSizeByPointAndAngle(point: PointCoordinates, angle: UnitTypes[Unit.degree]): BlockSize {

    const intersectionPoint = getIntersectionOfLineFromOriginAndItsPerpendicularByPoint(point, angle);

    const width = getDistanceFromOrigin(intersectionPoint);
    const height = getDistanceBetweenTwoPoints(intersectionPoint, point);

    const isWidthPositive = isPointInFrontOfOriginVector(point, angle, 90);
    const isHeightPositive = isPointInFrontOfOriginVector(point, angle + 90, 90);

    return {
        width: isWidthPositive
            ? width
            : -width,
        height: isHeightPositive
            ? height
            : -height,
    };
}
