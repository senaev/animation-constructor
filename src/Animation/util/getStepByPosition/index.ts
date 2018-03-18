import { Step } from '../../../AnimationScript';
import { Unit } from '../../../Unit/Unit';

type StepWithPosition<T extends Unit> = {
    step: Step<T>;
    stepPosition: number;
    stepIndex: number;
};

export function getStepByPosition<T extends Unit>(position: number,
                                                  steps: Step<T>[]): StepWithPosition<T> {
    let durationSum = 0;

    const { length } = steps;
    for (let stepIndex = 0; stepIndex < length; stepIndex++) {
        const step = steps[stepIndex];
        const nextDurationSum = durationSum + step.duration;

        if (stepIndex === length - 1) {
            return {
                step,
                stepPosition: durationSum,
                stepIndex,
            };
        } else {
            if (durationSum <= position && position < nextDurationSum) {
                return {
                    step,
                    stepPosition: durationSum,
                    stepIndex,
                };
            } else {
                durationSum = nextDurationSum;
            }
        }
    }

    throw new Error(`Wrong steps or position value [${position}][${JSON.stringify(steps)}]`);
}
