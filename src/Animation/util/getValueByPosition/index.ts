import { ScriptAction } from '../../../AnimationScript';
import { AllEasings } from '../../../Easing/AllEasings';
import { UnitName } from '../../../Unit/UNIT_NAMES';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { AllUnitTransitionFunctions } from '../../../UnitTransition/AllUnitTransitionFunctions';

export function getValueByPosition<T extends UnitName>(position: number,
                                                       unit: T,
                                                       actions: ScriptAction<T>[]): UnitTypes[T] {
    const { length } = actions;

    if (length === 1) {
        return actions[0].value;
    }

    let durationSum = 0;

    for (let i = 0; i < length; i++) {
        const {
            duration,
            value,
            easingName,
        } = actions[i];
        const nextDurationSum = durationSum + duration;

        if (i === length - 1) {
            return value;
        } else {
            if (durationSum <= position && position <= nextDurationSum) {
                if (easingName === undefined) {
                    return value;
                }

                const { value: nextActionValue } = actions[i + 1];

                const transitionFunction = AllEasings[easingName];
                const positionInsideOfAction = (position - durationSum) / duration;

                const positionConsideringTransitionFunction = transitionFunction(positionInsideOfAction);

                const unitTransitionFunction = AllUnitTransitionFunctions[unit];
                return unitTransitionFunction(
                    positionConsideringTransitionFunction,
                    value,
                    nextActionValue,
                );
            } else {
                durationSum = nextDurationSum;
            }
        }
    }

    throw new Error(`Wrong actions or position value [${position}][${JSON.stringify(actions)}]`);
}
