import { Unit } from '../../Unit/Unit';

export type ChangedAction<T extends Record<string, Unit>> = {
    fieldName: keyof T;
    actionIndex: number;
};
