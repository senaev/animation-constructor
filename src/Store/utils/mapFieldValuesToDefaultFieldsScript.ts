import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { AnimationElementFieldsScript } from '../../AnimationScript';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { createDefaultUnitScript } from './createDefaultUnitScript';

export function mapFieldValuesToDefaultFieldsScript<T extends AnimationElements>
(elementName: T, fieldValues: AnimationElementFieldsTypes<T>): AnimationElementFieldsScript<T> {
    return mapObjectValues(
        fieldValues,
        (value, fieldName) => {
            const animationElementFieldsUnits = AnimationElementsFieldsUnits[elementName];
            const unit = animationElementFieldsUnits[fieldName];

            return createDefaultUnitScript({
                unit,
                value,
            } as any) as any;
        },
    );
}
