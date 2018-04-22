import { ALL_COLOR_PROPERTIES } from '../Color/ALL_COLOR_PROPERTIES';
import { isObject } from '../utils/isObject';
import { Unit } from './Unit';
import { UnitTypes } from './UnitTypes';

const validateNumber = (value: UnitTypes[Unit.percent]) => {
    if (typeof value !== 'number') {
        throw new Error(`value is not a number, but [${value}][${typeof value}]`);
    }
};

const validateBoolean = (value: UnitTypes[Unit.boolean]) => {
    if (typeof value !== 'boolean') {
        throw new Error(`value is not a boolean, but [${value}][${typeof value}]`);
    }
};

const validateColor = (value: UnitTypes[Unit.color]) => {
    if (!isObject(value)) {
        throw new Error(`value is not an object, but [${value}][${typeof value}]`);
    }

    ALL_COLOR_PROPERTIES.forEach((colorProperty) => {
        // TODO: add diapasons checking
        try {
            validateNumber(value[colorProperty]);
        } catch ({ message }) {
            throw new Error(`Color property [${colorProperty}] is not valid [${message}]`);
        }
    });
};

export const UnitValuesValidators: {
    [key in keyof UnitTypes]: (value: UnitTypes[key]) => void;
} = {
    degree: validateNumber,
    percent: validateNumber,
    percentZeroToInfinity: validateNumber,
    pixel: validateNumber,
    color: validateColor,
    boolean: validateBoolean,
};
