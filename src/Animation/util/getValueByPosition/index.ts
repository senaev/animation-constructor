import { ScriptAction } from '../../../AnimationScript';
import { AllEasings } from '../../../Easing/AllEasings';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { AllUnitTransitionFunctions } from '../../../UnitTransition/AllUnitTransitionFunctions';
import { getActionByPosition } from '../getActionByPosition';

export function getValueByPosition<T extends Unit>(position: number,
                                                   unit: T,
                                                   actions: ScriptAction<T>[]): UnitTypes[T] {
    const {
        action,
        actionPosition,
        index,
    } = getActionByPosition(position, actions);

    const {
        duration,
        value,
        easing,
    } = action;

    if (index === actions.length - 1 || duration === 0 || easing === undefined) {
        return value;
    } else {
        const nextActionValue = actions[index + 1].value;

        const transitionFunction = AllEasings[easing];
        const positionInsideOfAction = (position - actionPosition) / duration;

        const positionConsideringTransitionFunction = transitionFunction(positionInsideOfAction);

        const unitTransitionFunction = AllUnitTransitionFunctions[unit];
        return unitTransitionFunction(
            positionConsideringTransitionFunction,
            value,
            nextActionValue,
        );
    }
}
