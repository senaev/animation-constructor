import { Unit } from '../../Unit/Unit';

export type AddedAction<T extends Record<string, Unit>> = {
    fieldName: keyof T;
    position: number;
};
