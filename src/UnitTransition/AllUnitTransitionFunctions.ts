import { ALL_COLOR_PROPERTIES } from '../Color/ALL_COLOR_PROPERTIES';
import { Color } from '../Color/Color';
import { Unit } from '../Unit/Unit';
import { mapArrayValuesToObject } from '../utils/mapArrayValuesToObject';
import { UnitTransitionFunction } from './UnitTransitionFunction';

const proceedNumber = (position: number,
                       startValue: number,
                       endValue: number): number => {
    const diff = (endValue - startValue) * position;
    return startValue + diff;
};

export const AllUnitTransitionFunctions: Record<Unit, UnitTransitionFunction<Unit>> = {
    [Unit.degree]: proceedNumber as UnitTransitionFunction<Unit>,
    [Unit.percent]: proceedNumber as UnitTransitionFunction<Unit>,
    [Unit.pixel]: proceedNumber as UnitTransitionFunction<Unit>,
    [Unit.color]: ((position, startValue: Color, endValue: Color) => {
        return mapArrayValuesToObject(ALL_COLOR_PROPERTIES, (colorPropertyName) => {
            return proceedNumber(position, startValue[colorPropertyName], endValue[colorPropertyName]);
        });
    }) as UnitTransitionFunction<Unit>,
};
