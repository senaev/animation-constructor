import { PointCoordinates } from '../../types/PointCoordinates';
import { UnitTypes } from '../../Unit/UnitTypes';
import { getAngleRelativeToOrigin } from './getAngleRelativeToOrigin';
import { getDifferenceBetweenAngles } from './getDifferenceBetweenAngles';

export function isPointInFrontOfOriginVector(targetPoint: PointCoordinates,
                                             vectorAngle: UnitTypes['degree'],
                                             threshold: UnitTypes['degree']): boolean {

    const pointAngle = getAngleRelativeToOrigin(targetPoint);
    const difference = getDifferenceBetweenAngles(vectorAngle, pointAngle);

    return difference <= threshold;
}
