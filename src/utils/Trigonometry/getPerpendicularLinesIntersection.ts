import { PointCoordinates } from '../../BlockPosition/BlockPosition';
import { Unit } from '../../UnitName/Unit';
import { UnitTypes } from '../../UnitName/UnitTypes';
import { getCrossingOriginLineByAngle } from './getCrossingOriginLineByAngle';
import { getLinesIntersectionPoint } from './getLinesIntersectionPoint';
import { getPerpendicularLineByPoint } from './getPerpendicularLineByPoint';

// tslint:disable:max-line-length
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
