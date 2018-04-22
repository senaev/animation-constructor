import { Step } from '../../AnimationScript';
import { Easing } from '../../Easing/Easing';
import { Unit } from '../../Unit/Unit';

export function setStepEasing<T extends Unit>(steps: Step<T>[],
                                              stepIndex: number,
                                              easing: Easing | undefined): Step<T>[] {
    return steps.map((step, i) => {
        if (i === stepIndex) {
            return {
                ...step,
                easing,
            };
        } else {
            return step;
        }
    });
}
