import { PointCoordinates } from '../../types/PointCoordinates';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { getAngleRelativeToOrigin } from './getAngleRelativeToOrigin';
import { getDifferenceBetweenAngles } from './getDifferenceBetweenAngles';

export function isPointInFrontOfOriginVector(targetPoint: PointCoordinates,
                                             vectorAngle: UnitTypes[Unit.degree],
                                             threshold: UnitTypes[Unit.degree]): boolean {

    const pointAngle = getAngleRelativeToOrigin(targetPoint);
    const difference = getDifferenceBetweenAngles(vectorAngle, pointAngle);

    return difference <= threshold;
}
