import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementsDefaultValues } from '../../AnimationElements/AnimationElementsDefaultValues';
import { AnimationElementFieldsScript } from '../../AnimationScript';
import { mapFieldValuesToDefaultFieldsScript } from './mapFieldValuesToDefaultFieldsScript';

export function getDefaultFieldsScriptForAnimationElement<T extends AnimationElements>
(elementName: T): AnimationElementFieldsScript<T> {
    const defaultFieldValues: AnimationElementFieldsTypes<T> = AnimationElementsDefaultValues[elementName] as any;

    return mapFieldValuesToDefaultFieldsScript(elementName, defaultFieldValues);
}
