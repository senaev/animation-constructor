import { UnitScript } from '../../AnimationScript';
import { Easing } from '../../Easing/Easing';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export function createDefaultUnitScript<T extends Unit>(unit: T, value: UnitTypes[T]): UnitScript<T> {
    return {
        unit,
        steps: [
            {
                duration: 1,
                value,
                easing: Easing.easeInOut,
            },
        ],
    };
}
