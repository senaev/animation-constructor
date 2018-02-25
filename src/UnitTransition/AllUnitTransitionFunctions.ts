import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTransitionFunction } from './UnitTransitionFunction';

const proceedNumber = (position: number,
                       startValue: number,
                       endValue: number): number => {
    const diff = (endValue - startValue) * position;
    return startValue + diff;
};

export const AllUnitTransitionFunctions: Record<UnitName, UnitTransitionFunction<UnitName>> = {
    degree: proceedNumber,
    percent: proceedNumber,
    pixel: proceedNumber,
    // TODO: add normal color transition
    color: (position, startValue) => startValue,
};
