import { Unit } from '../../Unit/Unit';

export type EditableStep<T extends Record<string, Unit>> = {
    fieldName: keyof T;
    stepIndex: number;
};
