import { Step } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { removeElementFromArray } from '../../utils/removeElementFromArray';

export function removeStep<T extends Unit>(steps: Step<T>[],
                                           stepIndex: number): Step<T>[] {
    const replacedPrevious = steps.map((step, i) => {
        if (i === stepIndex - 1) {
            return {
                ...step,
                duration: steps[i].duration + steps[stepIndex].duration,
            };
        } else {
            return step;
        }
    });

    return removeElementFromArray(replacedPrevious, stepIndex);
}
