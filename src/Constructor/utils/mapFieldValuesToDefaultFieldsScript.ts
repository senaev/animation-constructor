import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementFieldsValues } from '../../AnimationElements/AnimationElementsFieldsValues';
import { AnimationElementFieldsScript } from '../../AnimationScript';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { createDefaultUnitScript } from './createDefaultUnitScript';

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
