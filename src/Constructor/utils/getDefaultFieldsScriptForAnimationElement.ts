import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { getElementDefaultFieldsValues } from '../../AnimationElements/utils/getElementDefaultFieldsValues';
import { UnitScripts } from '../../AnimationScript';
import { mapFieldValuesToDefaultFieldsScript } from './mapFieldValuesToDefaultFieldsScript';

export function getDefaultFieldsScriptForAnimationElement<T extends AnimationElementName>(elementName: T): UnitScripts {
    const defaultFieldValues = getElementDefaultFieldsValues(elementName);

    return mapFieldValuesToDefaultFieldsScript(elementName, defaultFieldValues);
}
