import { Unit } from '../../Unit/Unit';
import { EditableStep } from './EditableStep';

export type EditableStepPosition<T extends Record<string, Unit>> =
    & EditableStep<T>
    & {
    position: number;
};
