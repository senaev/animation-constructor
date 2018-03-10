import { Unit } from '../../Unit/Unit';

export type ActionPosition<T extends Record<string, Unit>> = {
    fieldName: keyof T;
    actionIndex: number;
    position: number;
};
