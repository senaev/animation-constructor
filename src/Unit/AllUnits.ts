import { getObjectKeys } from '../utils/getObjectKeys';
import { Unit } from './Unit';

export const AllUnitsObject: Record<Unit, undefined> = {
    degree: undefined,
    percent: undefined,
    percentZeroToInfinity: undefined,
    pixel: undefined,
    color: undefined,
    boolean: undefined,
};

export const AllUnits: Unit[] = getObjectKeys(AllUnitsObject);
