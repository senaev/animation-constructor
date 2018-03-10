import { ScriptAction } from '../';
import { Unit } from '../../Unit/Unit';

export type ActionParams = {
    previousPosition: number | undefined;
    position: number;
    nextPosition: number | undefined;
    duration: number;
};

export function getActionsParams(actions: ScriptAction<Unit>[]): ActionParams[] {

    let durationSum = 0;

    return actions.map(({ duration }, i) => {
        const position = durationSum;
        durationSum += duration;

        return {
            previousPosition: i === 0
                ? undefined
                : position - actions[i - 1].duration,
            position,
            nextPosition: i === actions.length - 1
                ? undefined
                : durationSum,
            duration,
        };
    });
}
