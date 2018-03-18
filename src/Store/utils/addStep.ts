import { getStepByPosition } from '../../Animation/util/getStepByPosition';
import { Step } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export function addStep<T extends Unit>(steps: Step<T>[],
                                        position: number,
                                        newValue: UnitTypes[T]): Step<T>[] {
    const {
        step,
        stepPosition,
        stepIndex,
    } = getStepByPosition(position, steps);

    const {
        duration,
        value,
        easing,
    } = step;

    const nextStep: Step<T> | undefined = steps[stepIndex + 1];

    const nextSteps: Step<T>[] = [];
    steps.forEach((currentAction, i) => {
        if (i === stepIndex) {
            const reducedStepDuration = position - stepPosition;

            if (reducedStepDuration === 0) {
                throw new Error('Cannot add new step to the same position as other');
            }

            const newStepDuration = (
                nextStep === undefined
                    ? 1
                    : (stepPosition + duration)
            ) - position;

            nextSteps.push({
                duration: reducedStepDuration,
                value,
                easing,
            });

            nextSteps.push({
                duration: newStepDuration,
                value: newValue,
                easing,
            });
        } else {
            nextSteps.push(currentAction);
        }
    });

    return nextSteps;
}
