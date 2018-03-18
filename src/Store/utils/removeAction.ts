import { ScriptAction } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { removeElementFromArray } from '../../utils/removeElementFromArray';

export function removeAction<T extends Unit>(actions: ScriptAction<T>[],
                                             actionIndex: number): ScriptAction<T>[] {
    const replacedPrevious = actions.map((action, i) => {
        if (i === actionIndex - 1) {
            return {
                ...action,
                duration: actions[i].duration + actions[actionIndex].duration,
            };
        } else {
            return action;
        }
    });

    return removeElementFromArray(replacedPrevious, actionIndex);
}
