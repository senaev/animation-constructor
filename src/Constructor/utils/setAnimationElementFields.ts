import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementFields';
import { AnimationElementFieldsValues } from '../../AnimationElements/AnimationElementsFieldsValues';
import { AnimationElementFieldsScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { UnitName } from '../../Unit/UNIT_NAMES';
import { UnitTypes } from '../../Unit/UnitTypes';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../Store/State';
import { createDefaultUnitScript } from './createDefaultUnitScript';

export function setAnimationElementFields(state: ConstructorState,
                                          blockLocation: BlockLocation,
                                          animationElementFields: Partial<AnimationElementFieldsValues>): ConstructorState {

    const {
        animationScript,
    } = state;

    const editedAnimationElementNumber = blockLocation[0];
    const editedAnimationElement = animationScript[editedAnimationElementNumber];

    const {
        elementName,
        blockPositionScript,
        fieldsScript,
    } = editedAnimationElement;

    const nextAnimationElementFields: AnimationElementFieldsScript = mapObjectValues(
        animationElementFields,
        (value, animationElementFieldName) => {
            return createDefaultUnitScript(
                AnimationElementsFieldsUnits[elementName][animationElementFieldName],
                value as UnitTypes[UnitName],
            );
        },
    );

    const nextAnimationElementFieldsScript: AnimationElementFieldsScript = {
        ...fieldsScript,
        ...nextAnimationElementFields,
    };

    return {
        ...state,
        animationScript: animationScript.map((animationElementScript, i) => {
            if (i === editedAnimationElementNumber) {
                return {
                    elementName,
                    blockPositionScript,
                    fieldsScript: nextAnimationElementFieldsScript,
                };
            } else {
                return animationElementScript;
            }
        }),
    };
}
