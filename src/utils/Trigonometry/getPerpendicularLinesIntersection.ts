import { PointCoordinates } from '../../types/PointCoordinates';
import { UnitTypes } from '../../Unit/UnitTypes';
import { getCrossingOriginLineByAngle } from './getCrossingOriginLineByAngle';
import { getLinesIntersectionPoint } from './getLinesIntersectionPoint';
import { getPerpendicularLineByPoint } from './getPerpendicularLineByPoint';

export function getIntersectionOfLineFromOriginAndItsPerpendicularByPoint(point: PointCoordinates,
                                                                          angle: UnitTypes['degree']): PointCoordinates {
    if (angle === 0) {
        return {
            x: point.x,
            y: 0,
        };
    } else {
        const crossOriginLine = getCrossingOriginLineByAngle(angle);
        const perpendicularLine = getPerpendicularLineByPoint(crossOriginLine, point);

        return getLinesIntersectionPoint(crossOriginLine, perpendicularLine)!;
    }
}
