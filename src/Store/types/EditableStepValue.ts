import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { EditableStep } from './EditableStep';

export type EditableStepValue<T extends Record<string, Unit>> =
    & EditableStep<T>
    & {
    value: UnitTypes[T[keyof T]];
};
