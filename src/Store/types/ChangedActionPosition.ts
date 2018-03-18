import { Unit } from '../../Unit/Unit';
import { ChangedAction } from './ChangedAction';

export type ChangedActionPosition<T extends Record<string, Unit>> =
    & ChangedAction<T>
    & {
    position: number;
};
