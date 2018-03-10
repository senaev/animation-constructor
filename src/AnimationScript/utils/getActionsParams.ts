import { ScriptAction } from '../';
import { Unit } from '../../Unit/Unit';

export type ActionParams = {
    previousActionPosition: number | undefined;
    position: number;
    nextActionPosition: number | undefined;
    duration: number;
};

export function getActionsParams(actions: ScriptAction<Unit>[]): ActionParams[] {

    let durationSum = 0;

    return actions.map(({ duration }, i) => {
        const position = durationSum;
        durationSum += duration;

        return {
            previousActionPosition: i === 0
                ? undefined
                : position - actions[i - 1].duration,
            position,
            nextActionPosition: i === actions.length - 1
                ? undefined
                : durationSum,
            duration,
        };
    });
}
