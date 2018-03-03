import { AnimationElementsFieldsUnits, } from '../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { AnimationElementFieldsValues } from '../AnimationElements/AnimationElementsFieldsValues';
import { getElementDefaultFieldsValues } from '../AnimationElements/utils/getElementDefaultFieldsValues';
import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';
import { mapObjectValues } from '../utils/mapObjectValues';
import { AnimationElementFieldsScript, UnitScript } from './';

export function createDefaultUnitScript<T extends UnitName>(unit: T, value: UnitTypes[T]): UnitScript<T> {
    return {
        unit,
        actions: [{
            duration: 1,
            value,
            easingName: undefined,
        }],
    };
}

export function mapFieldValuesToDefaultFieldsScript<T extends AnimationElementName>
(elementName: T, fieldValues: AnimationElementFieldsValues): AnimationElementFieldsScript {
    return mapObjectValues(
        fieldValues,
        (value, fieldName) => {
            const animationElementFieldsUnits = AnimationElementsFieldsUnits[elementName];
            const unitName = animationElementFieldsUnits[fieldName];

            return createDefaultUnitScript(unitName, value);
        }
    );
}

export function getDefaultFieldsScriptForAnimationElement<T extends AnimationElementName>(elementName: T): AnimationElementFieldsScript {
    const defaultFieldValues = getElementDefaultFieldsValues(elementName);

    return mapFieldValuesToDefaultFieldsScript(elementName, defaultFieldValues);
}
