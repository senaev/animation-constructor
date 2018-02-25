import { AnimationElementsFieldsUnits } from '../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { getElementDefaultFieldsValues } from '../AnimationElements/utils/getElementDefaultFieldsValues';
import { UnitName } from '../Unit/UNIT_NAMES';
import { mapObjectValues } from '../utils/mapObjectValues';
import { AnimationElementFieldsScript } from './';

export function getDefaultFieldsScriptForAnimationElement<T extends AnimationElementName>(elementName: T): AnimationElementFieldsScript {
    const defaultFieldValues = getElementDefaultFieldsValues(elementName);

    return mapObjectValues(
        defaultFieldValues,
        (value, fieldName) => {
            const animationElementFieldsUnits: Record<string, UnitName> = AnimationElementsFieldsUnits[elementName];
            const unit = animationElementFieldsUnits[fieldName];

            return {
                unit,
                actions: [],
                easingName: undefined,
            };
        }
    );
}
