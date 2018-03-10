import { ScriptAction } from '../../AnimationScript';
import { getActionsPositions } from '../../AnimationScript/utils/getActionsPositions';
import { Unit } from '../../Unit/Unit';

export function setActionPosition<T extends Unit>(actions: ScriptAction<T>[],
                                                  actionIndex: number,
                                                  position: number): ScriptAction<T>[] {
    if (actionIndex === 0) {
        throw new Error('It is impossible to change first action position in UnitScript');
    }

    const actionsPositions = getActionsPositions(actions);

    const previousActionPosition = actionsPositions[actionIndex - 1];
    const nextActionPosition = actionsPositions[actionIndex + 1];

    if (position <= previousActionPosition) {
        throw new Error('It is impossible to set action position that less than or equal to previous action position');
    }

    if (nextActionPosition !== undefined) {
        if (position >= nextActionPosition) {
            throw new Error('It is impossible to set action position that greater than or equal to next action position');
        }
    }

    const previousActionDuration = position - previousActionPosition;
    const actionDuration = nextActionPosition === undefined
        ? 1 - position
        : nextActionPosition - position;

    return actions.map((action, i) => {
        if (i === actionIndex - 1) {
            return {
                ...action,
                duration: previousActionDuration,
            };
        } else if (i === actionIndex) {
            return {
                ...action,
                duration: actionDuration,
            };
        } else {
            return action;
        }
    });
}
