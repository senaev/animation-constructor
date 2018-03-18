import { Unit } from '../../Unit/Unit';

export type AdditionalStep<T extends Record<string, Unit>> = {
    fieldName: keyof T;
    position: number;
};
