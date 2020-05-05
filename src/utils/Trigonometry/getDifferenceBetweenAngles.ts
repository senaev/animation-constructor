import { UnitTypes } from '../../Unit/UnitTypes';

export function getDifferenceBetweenAngles(firstAngle: UnitTypes['degree'],
                                           secondAngle: UnitTypes['degree']): UnitTypes['degree'] {
    let firstDifference: UnitTypes['degree'];
    let secondDifference: UnitTypes['degree'];

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
