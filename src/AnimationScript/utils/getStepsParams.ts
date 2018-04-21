import { Step } from '../';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export type StepParams<T extends Unit> = {
    previousStepPosition: number | undefined;
    position: number;
    nextStepPosition: number | undefined;
    duration: number;
    value: UnitTypes[T];
};

export function getStepsParams<T extends Unit>(steps: Step<T>[]): StepParams<T>[] {

    let durationSum = 0;

    return steps.map(({
                          duration,
                          value,
                      }, i) => {
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
            value,
        };
    });
}
