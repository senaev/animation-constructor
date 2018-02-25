import { PointCoordinates } from '../../BlockPosition/BlockPosition';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { getCrossingOriginLineByAngle } from './getCrossingOriginLineByAngle';
import { getLinesIntersectionPoint } from './getLinesIntersectionPoint';
import { getPerpendicularLineByPoint } from './getPerpendicularLineByPoint';

export function getIntersectionOfLineFromOriginAndItsPerpendicularByPoint(point: PointCoordinates,
                                                                          angle: UnitTypes[Unit.degree]): PointCoordinates {
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
