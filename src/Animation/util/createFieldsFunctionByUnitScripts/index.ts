import { ScriptAction, UnitScripts } from '../../../AnimationScript';
import { AllEasings } from '../../../Easing/AllEasings';
import { UnitName } from '../../../Unit/UNIT_NAMES';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { AllUnitTransitionFunctions } from '../../../UnitTransition/AllUnitTransitionFunctions';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import { mapArrayValuesToObject } from '../../../utils/mapArrayValuesToObject';

function getValueByPosition<T extends UnitName>(position: number,
                                                unit: T,
                                                actions: ScriptAction<T>[]): UnitTypes[T] {
    const { length } = actions;
    let durationSum = 0;

    for (let i = 0; i < length; i++) {
        const {
            duration,
            value,
            easingName,
        } = actions[i];
        const nextDurationSum = durationSum + duration;

        if (easingName === undefined || i === length - 1) {
            return value;
        } else {
            if (durationSum <= position && position <= nextDurationSum) {
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

export function createFieldsFunctionByUnitScripts<T extends Record<string,
    UnitName>>(unitScripts: UnitScripts<T>): (position: number) => T {
    const allFieldNames = getObjectKeys(unitScripts);

    return (newPosition: number) => {
        return mapArrayValuesToObject(allFieldNames, (fieldName) => {
            const {
                actions,
                unit,
            } = unitScripts[fieldName];

            const { length } = actions;

            if (length === 0) {
                throw new Error(`No actions in animation script [${fieldName}][${unit}]`);
            } else if (length === 1) {
                return actions[0].value;
            } else {
                return getValueByPosition(newPosition, unit, actions);
            }
        }) as T;
    };
}
