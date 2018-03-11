import { ScriptAction } from '../../../AnimationScript';
import { Unit } from '../../../Unit/Unit';

type ActionWithPosition<T extends Unit> = {
    action: ScriptAction<T>;
    actionPosition: number;
    index: number;
};

export function getActionByPosition<T extends Unit>(position: number,
                                                    actions: ScriptAction<T>[]): ActionWithPosition<T> {
    let durationSum = 0;

    const { length } = actions;
    for (let i = 0; i < length; i++) {
        const action = actions[i];
        const nextDurationSum = durationSum + action.duration;

        if (i === length - 1) {
            return {
                action,
                actionPosition: durationSum,
                index: i,
            };
        } else {
            if (durationSum <= position && position < nextDurationSum) {
                return {
                    action,
                    actionPosition: durationSum,
                    index: i,
                };
            } else {
                durationSum = nextDurationSum;
            }
        }
    }

    throw new Error(`Wrong actions or position value [${position}][${JSON.stringify(actions)}]`);
}
