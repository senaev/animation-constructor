import { Step } from '../';
import { Unit } from '../../Unit/Unit';

export type StepParams = {
    previousStepPosition: number | undefined;
    position: number;
    nextStepPosition: number | undefined;
    duration: number;
};

export function getStepParams(steps: Step<Unit>[]): StepParams[] {

    let durationSum = 0;

    return steps.map(({ duration }, i) => {
        const position = durationSum;
        durationSum += duration;

        return {
            previousStepPosition: i === 0
                ? undefined
                : position - steps[i - 1].duration,
            position,
            nextStepPosition: i === steps.length - 1
                ? undefined
                : durationSum,
            duration,
        };
    });
}
