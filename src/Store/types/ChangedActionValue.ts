import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { ChangedAction } from './ChangedAction';

export type ChangedActionValue<T extends Record<string, Unit>> =
    & ChangedAction<T>
    & {
    value: UnitTypes[T[keyof T]];
};
