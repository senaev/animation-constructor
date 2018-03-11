import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export type ActionValue<T extends Record<string, Unit>> = {
    fieldName: keyof T;
    actionIndex: number;
    value: UnitTypes[T[keyof T]];
};
