import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';

export type UnitTransitionFunction = {
    [key in Unit]: (position: number,
                    startValue: UnitTypes[key],
                    endValue: UnitTypes[key]) => UnitTypes[key]
};
