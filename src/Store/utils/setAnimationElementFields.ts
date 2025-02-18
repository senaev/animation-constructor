import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { AnimationElementScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../ConstructorState';
import { createDefaultUnitScript } from './createDefaultUnitScript';

export function setAnimationElementFields<T extends AnimationElements>
(state: ConstructorState,
 blockLocation: BlockLocation,
 animationElementFields: Partial<AnimationElementFieldsTypes<T>>): ConstructorState {

    const {
        animationScript,
    } = state;

    const editedAnimationElementIndex = blockLocation[0];
    const editedAnimationElement = animationScript[editedAnimationElementIndex] as AnimationElementScript<T>;

    const {
        elementName,
        blockScript,
        fieldsScript,
    } = editedAnimationElement;

    const nextAnimationElementFields = mapObjectValues(
        animationElementFields as AnimationElementFieldsTypes<T>,
        (value, animationElementFieldName) => {
            return createDefaultUnitScript({
                unit: AnimationElementsFieldsUnits[elementName][animationElementFieldName],
                value,
            } as any);
        },
    );

    const nextAnimationElementFieldsScript = {
        ...fieldsScript as Record<string, any>,
        ...nextAnimationElementFields as Record<string, any>,
    };

    return {
        ...state,
        animationScript: animationScript.map((animationElementScript, i) => {
            if (i === editedAnimationElementIndex) {
                return {
                    elementName,
                    blockScript,
                    fieldsScript: nextAnimationElementFieldsScript,
                } as AnimationElementScript<T>;
            } else {
                return animationElementScript;
            }
        }),
    };
}
