import { ScriptAction } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export function setActionValue<T extends Unit>(actions: ScriptAction<T>[],
                                               actionIndex: number,
                                               value: UnitTypes[T]): ScriptAction<T>[] {
    return actions.map((action, i) => {
        if (i === actionIndex) {
            return {
                ...action,
                value,
            };
        } else {
            return action;
        }
    });
}
