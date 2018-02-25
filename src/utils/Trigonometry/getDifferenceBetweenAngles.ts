import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export function getDifferenceBetweenAngles(firstAngle: UnitTypes[Unit.degree],
                                           secondAngle: UnitTypes[Unit.degree]): UnitTypes[Unit.degree] {
    let firstDifference: UnitTypes[Unit.degree];
    let secondDifference: UnitTypes[Unit.degree];

    if (firstAngle > secondAngle) {
        firstDifference = firstAngle - secondAngle;
        secondDifference = secondAngle - firstAngle + 360;
    } else {
        firstDifference = secondAngle - firstAngle;
        secondDifference = firstAngle - secondAngle + 360;
    }
    return firstDifference < secondDifference
        ? firstDifference
        : secondDifference;
}
