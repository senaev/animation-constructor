import { AnimationElementFieldsTypes, AnimationElementsFieldsUnits } from '../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { getElementDefaultFieldsValues } from '../AnimationElements/utils/getElementDefaultFieldsValues';
import { mapObjectValues } from '../utils/mapObjectValues';
import { AnimationElementFieldsScript } from './index';

// tslint:disable-next-line:max-line-length
export function getFieldsScriptForAnimationElement<T extends AnimationElementName>(elementName: T): AnimationElementFieldsScript<T> {
    const defaultFieldValues = getElementDefaultFieldsValues(elementName) as any as AnimationElementFieldsTypes<T>;

    return mapObjectValues(
        defaultFieldValues,
        (value, fieldName) => {
            const unit = AnimationElementsFieldsUnits[elementName][fieldName];

            return {
                unit,
                actions: [],
                easingName: undefined,
            };
        }
    );
}
