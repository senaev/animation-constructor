import { PointCoordinates } from '../../BlockPosition/BlockPosition';
import { Unit } from '../../UnitName/Unit';
import { UnitTypes } from '../../UnitName/UnitTypes';
import { getAngleRelativeToOrigin } from './getAngleRelativeToOrigin';
import { getDifferenceBetweenAngles } from './getDifferenceBetweenAngles';

export function isPointInFrontOfOriginVector(targetPoint: PointCoordinates,
                                             vectorAngle: UnitTypes[Unit.degree],
                                             threshold: UnitTypes[Unit.degree]): boolean {

    const pointAngle = getAngleRelativeToOrigin(targetPoint);
    const difference = getDifferenceBetweenAngles(vectorAngle, pointAngle);

    return difference <= threshold;
}
