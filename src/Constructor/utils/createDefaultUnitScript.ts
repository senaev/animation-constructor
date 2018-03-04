import { UnitScript } from '../../AnimationScript';
import { Easing } from '../../Easing/Easing';
import { UnitName } from '../../Unit/UNIT_NAMES';
import { UnitTypes } from '../../Unit/UnitTypes';

export function createDefaultUnitScript<T extends UnitName>(unit: T, value: UnitTypes[T]): UnitScript<T> {
    return {
        unit,
        actions: [
            {
                duration: 0.3,
                value,
                easingName: Easing.easeInOut,
            },
            {
                duration: 0.3,
                value: typeof value === 'number' ? 1 : value,
                easingName: Easing.easeInOut,
            },
            {
                duration: 0.3,
                value: typeof value === 'number' ? 0.3 : value,
                easingName: Easing.easeInOut,
            },
            {
                duration: 0.1,
                value: typeof value === 'number' ? 1 : value,
                easingName: Easing.easeInOut,
            },
        ],
    };
}
