import { Step } from '../../../AnimationScript';
import { AllEasings } from '../../../Easing/AllEasings';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { AllUnitTransitionFunctions } from '../../../UnitTransition/AllUnitTransitionFunctions';
import { UnitTransitionFunction } from '../../../UnitTransition/UnitTransitionFunction';
import { getStepByPosition } from '../getStepByPosition';

export function getValueByPosition<T extends Unit> (position: number,
                                                    unit: T,
                                                    steps: Step<T>[]): UnitTypes[T] {
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

    if (stepIndex === steps.length - 1 || duration === 0 || easing === undefined) {
        return value;
    }

    const nextStepValue = steps[stepIndex + 1].value;

    const transitionFunction = AllEasings[easing];
    const positionInsideOfStep = (position - stepPosition) / duration;

    const positionConsideringTransitionFunction = transitionFunction(positionInsideOfStep);

    const unitTransitionFunction: UnitTransitionFunction[T] = AllUnitTransitionFunctions[unit];

    return (unitTransitionFunction as any)(
        positionConsideringTransitionFunction,
        value,
        nextStepValue,
    );
}
