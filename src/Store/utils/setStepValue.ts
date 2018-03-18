import { Step } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export function setStepValue<T extends Unit>(steps: Step<T>[],
                                             stepIndex: number,
                                             value: UnitTypes[T]): Step<T>[] {
    return steps.map((step, i) => {
        if (i === stepIndex) {
            return {
                ...step,
                value,
            };
        } else {
            return step;
        }
    });
}
