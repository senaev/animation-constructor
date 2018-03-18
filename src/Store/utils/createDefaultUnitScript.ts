import { UnitScript } from '../../AnimationScript';
import { Easing } from '../../Easing/Easing';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';

export function createDefaultUnitScript<T extends Unit>(unit: T, value: UnitTypes[T]): UnitScript<T> {
    return {
        unit,
        steps: [
            {
                duration: 0.3,
                value,
                easing: Easing.easeInOut,
            },
            {
                duration: 0.3,
                value: typeof value === 'number' ? 10 : {
                    r: 255,
                    g: 0,
                    b: 0,
                    a: 1,
                },
                easing: Easing.easeInOut,
            },
            {
                duration: 0.3,
                value: typeof value === 'number' ? 30 : {
                    r: 0,
                    g: 255,
                    b: 0,
                    a: 0.2,
                },
                easing: Easing.easeInOut,
            },
            {
                duration: 0.1,
                value: typeof value === 'number' ? 10 : {
                    r: 0,
                    g: 0,
                    b: 255,
                    a: 1,
                },
                easing: Easing.easeInOut,
            },
        ],
    };
}
