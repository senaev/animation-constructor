import { AnimationElementScript, AnimationScript, FieldsScripts, Step, UnitScript } from '../';
import { ALL_ANIMATION_ELEMENT_NAMES } from '../../AnimationElements/ALL_ANIMATION_ELEMENT_NAMES';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { BlockFieldUnits } from '../../Block/BlockFieldUnits';
import { AllEasingNames } from '../../Easing/AllEasingNames';
import { AllUnits } from '../../Unit/AllUnits';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { UnitValuesValidators } from '../../Unit/UnitValuesValidators';
import { getObjectKeys } from '../../utils/getObjectKeys';
import { isObject } from '../../utils/isObject';

function validateStep<T extends Unit>(step: Step<T>, unit: T): void {
    if (!isObject(step)) {
        throw new Error(`Step should be an object but got [${step}][${typeof step}]`);
    }

    const {
        duration,
        value,
        easing,
    } = step;

    if (typeof duration !== 'number') {
        throw new Error(`Step.duration should be a number but got [${duration}][${typeof duration}]`);
    }

    if (easing !== undefined) {
        if (typeof easing !== 'string') {
            throw new Error(`Step.easing should be a string but got [${easing}][${typeof duration}]`);
        }

        if (AllEasingNames.indexOf(easing) === -1) {
            throw new Error(`Step.easing is not one of known easing names [${easing}] ` +
                `all easing names [${AllEasingNames}]`);
        }
    }

    const validateUnitValue = UnitValuesValidators[unit] as (value: UnitTypes[T]) => void;
    validateUnitValue(value);
}

function validateUnitScript<T extends Unit>(unitScript: UnitScript<T>,
                                            expectedUnit: T): void {
    if (!isObject(unitScript)) {
        throw new Error(`UnitScript should be an object but got [${unitScript}][${typeof unitScript}]`);
    }

    const {
        unit,
        steps,
    } = unitScript;

    if (typeof unit !== 'string') {
        throw new Error(`UnitScript.unit should be a string but got [${unit}][${typeof unit}]`);
    }

    if (AllUnits.indexOf(unit) === -1) {
        throw new Error(`UnitScript.unit is not one of known unit names [${unit}] ` +
            `all names [${AllUnits}]`);
    }

    if (unit !== expectedUnit) {
        throw new Error(`UnitScript.unit value is [${unit}] but [${expectedUnit}] expected`);
    }

    if (!Array.isArray(steps)) {
        throw new Error(`UnitScript.steps should be an array but got [${steps}][${typeof steps}]`);
    }

    if (steps.length === 0) {
        throw new Error('UnitScript.steps does not provide any steps');
    }

    steps.forEach((step, i) => {
        try {
            validateStep(step, unit);
        } catch ({ message }) {
            throw new Error(`UnitScript.steps has invalid step by index [${i}] error [${message}]`);
        }
    });
}

function validateFieldsScript<T extends Record<string, Unit>>(
    fieldsScripts: FieldsScripts<T>,
    fieldsUnits: T,
): void {
    if (!isObject(fieldsScripts)) {
        throw new Error(`FieldsScripts should be an object but got [${fieldsScripts}][${typeof fieldsScripts}]`);
    }

    getObjectKeys(fieldsUnits).forEach((fieldName) => {
        const unitScript = fieldsScripts[fieldName];

        if (unitScript === undefined) {
            throw new Error(`FieldsScripts does not contain script for field [${fieldName}]`);
        }

        try {
            validateUnitScript(unitScript, fieldsUnits[fieldName]);
        } catch ({ message }) {
            throw new Error(`FieldsScripts contains invalid UnitScript in field [${fieldName}], error [${message}]`);
        }
    });
}

function validateAnimationElementScript(animationElementScript: AnimationElementScript<AnimationElements>): void {
    if (!isObject(animationElementScript)) {
        throw new Error('AnimationElementScript is not an object');
    }

    const {
        elementName,
        blockScript,
        fieldsScript,
    } = animationElementScript;

    if (typeof elementName !== 'string') {
        throw new Error(`AnimationElementScript.elementName should be a string but got [${elementName}][${typeof elementName}]`);
    }

    if (ALL_ANIMATION_ELEMENT_NAMES.indexOf(elementName) === -1) {
        throw new Error(`AnimationElementScript.elementName is not one of known element names [${elementName}] ` +
            `all names [${ALL_ANIMATION_ELEMENT_NAMES}]`);
    }

    try {
        validateFieldsScript(blockScript, BlockFieldUnits);
    } catch ({ message }) {
        throw new Error(`AnimationElementScript.blockScript error [${message}]`);
    }

    try {
        const elementFieldsUnits = AnimationElementsFieldsUnits[elementName];
        validateFieldsScript(fieldsScript, elementFieldsUnits);
    } catch ({ message }) {
        throw new Error(`AnimationElementScript.fieldsScript error [${message}]`);
    }
}

export function validateAnimationScript(animationScript: AnimationScript): void {
    if (Array.isArray(animationScript)) {
        animationScript.forEach((animationElementScript, i) => {
            try {
                validateAnimationElementScript(animationElementScript);
            } catch ({ message }) {
                throw new Error(`AnimationElementScript at index [${i}] is not valid [${message}]`);
            }
        });
    } else {
        throw new Error('AnimationScript script is not an array');
    }
}
