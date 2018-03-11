import { getActionByPosition } from '../../Animation/util/getActionByPosition';
import { ScriptAction } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export function addAction<T extends Unit>(actions: ScriptAction<T>[],
                                          position: number,
                                          newValue: UnitTypes[T]): ScriptAction<T>[] {
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

    const nextAction: ScriptAction<T> | undefined = actions[index + 1];

    const nextActions: ScriptAction<T>[] = [];
    actions.forEach((currentAction, i) => {
        if (i === index) {
            const reducedActionDuration = position - actionPosition;

            if (reducedActionDuration === 0) {
                throw new Error('Cannot add new action to the same position as other');
            }

            const newActionDuration = (
                nextAction === undefined
                    ? 1
                    : (actionPosition + duration)
            ) - position;

            nextActions.push({
                duration: reducedActionDuration,
                value,
                easing,
            });

            nextActions.push({
                duration: newActionDuration,
                value: newValue,
                easing,
            });
        } else {
            nextActions.push(currentAction);
        }
    });

    return nextActions;
}
