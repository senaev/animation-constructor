import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { getDistance } from './getDistance';
import { getDistanceFromOrigin } from './getDistanceFromOrigin';
import { getIntersectionOfLineFromOriginAndItsPerpendicularByPoint } from './getPerpendicularLinesIntersection';
import { isPointInFrontOfOriginVector } from './isPointInFrontOfVector';

export function getRectangleSizeByPointAndAngle(point: PointCoordinates, angle: UnitTypes[Unit.degree]): Size {

    const intersectionPoint = getIntersectionOfLineFromOriginAndItsPerpendicularByPoint(point, angle);

    const width = getDistanceFromOrigin(intersectionPoint);
    const height = getDistance(intersectionPoint, point);

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
