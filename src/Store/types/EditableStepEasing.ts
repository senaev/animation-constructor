import { Easing } from '../../Easing/Easing';
import { Unit } from '../../Unit/Unit';
import { EditableStep } from './EditableStep';

export type EditableStepEasing<T extends Record<string, Unit>> =
    & EditableStep<T>
    & {
    easing: Easing | undefined;
};
