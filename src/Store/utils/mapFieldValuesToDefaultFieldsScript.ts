import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { AnimationElementFieldsScript } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { createDefaultUnitScript } from './createDefaultUnitScript';

export function mapFieldValuesToDefaultFieldsScript<T extends AnimationElementName>
(elementName: T, fieldValues: AnimationElementFieldsTypes<T>): AnimationElementFieldsScript<T> {
    return mapObjectValues(
        fieldValues,
        (value, fieldName) => {
            const animationElementFieldsUnits = AnimationElementsFieldsUnits[elementName];
            const unit = animationElementFieldsUnits[fieldName];

            return createDefaultUnitScript(unit as any as Unit, value) as any;
        },
    );
}
