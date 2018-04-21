import { Step } from '../../AnimationScript';
import { getStepsParams } from '../../AnimationScript/utils/getStepsParams';
import { Unit } from '../../Unit/Unit';

export function setStepPosition<T extends Unit>(steps: Step<T>[],
                                                stepIndex: number,
                                                position: number): Step<T>[] {
    if (stepIndex === 0) {
        throw new Error('It is impossible to change first step position in UnitScript');
    }

    const stepsPositions = getStepsParams(steps);

    const previousStepPosition = stepsPositions[stepIndex - 1].position;
    const nextStep = stepsPositions[stepIndex + 1];
    const nextStepPosition = nextStep === undefined
        ? undefined
        : nextStep.position;

    if (position < previousStepPosition) {
        throw new Error('It is impossible to set step position that less than previous step position');
    }

    if (nextStepPosition !== undefined) {
        if (position > nextStepPosition) {
            throw new Error('It is impossible to set step position that greater than next step position');
        }
    }

    const previousStepDuration = position - previousStepPosition;
    const stepDuration = nextStepPosition === undefined
        ? 1 - position
        : nextStepPosition - position;

    return steps.map((step, i) => {
        if (i === stepIndex - 1) {
            return {
                ...step,
                duration: previousStepDuration,
            };
        } else if (i === stepIndex) {
            return {
                ...step,
                duration: stepDuration,
            };
        } else {
            return step;
        }
    });
}
