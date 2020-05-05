import { ALL_COLOR_PROPERTIES } from '../Color/ALL_COLOR_PROPERTIES';
import { Color } from '../Color/Color';
import { mapArrayValuesToObject } from '../utils/mapArrayValuesToObject';

const proceedNumber = (position: number,
                       startValue: number,
                       endValue: number): number => {
    const diff = (endValue - startValue) * position;
    return startValue + diff;
};

const proceedBoolean = (position: number, startValue: boolean, endValue: boolean): boolean => startValue;

export const AllUnitTransitionFunctions = {
    degree: proceedNumber,
    percent: proceedNumber,
    percentZeroToInfinity: proceedNumber,
    pixel: proceedNumber,
    color: ((position: number, startValue: Color, endValue: Color) => {
        return mapArrayValuesToObject(ALL_COLOR_PROPERTIES, (colorPropertyName) => {
            return proceedNumber(position, startValue[colorPropertyName], endValue[colorPropertyName]);
        });
    }),
    boolean: proceedBoolean,
} as const;
