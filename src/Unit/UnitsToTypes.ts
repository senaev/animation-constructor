import { Unit } from './Unit';
import { UnitTypes } from './UnitTypes';

export type UnitsToTypes<T extends Record<string, Unit>> = {
    [key in keyof T]: UnitTypes[T[key]];
};
