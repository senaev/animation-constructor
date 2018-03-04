import { ALL_COLOR_PROPERTIES } from '../Color/ALL_COLOR_PROPERTIES';
import { Color } from '../Color/Color';
import { UnitName } from '../Unit/UNIT_NAMES';
import { mapArrayValuesToObject } from '../utils/mapArrayValuesToObject';
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
    color (position, startValue: Color, endValue: Color) {
        return mapArrayValuesToObject(ALL_COLOR_PROPERTIES, (colorPropertyName) => {
            return proceedNumber(position, startValue[colorPropertyName], endValue[colorPropertyName]);
        });
    },
};
