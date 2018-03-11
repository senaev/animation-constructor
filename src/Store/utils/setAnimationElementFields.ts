import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { AnimationElementScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { Unit } from '../../Unit/Unit';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../State';
import { createDefaultUnitScript } from './createDefaultUnitScript';

export function setAnimationElementFields<T extends AnimationElementName>
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
            return createDefaultUnitScript(
                AnimationElementsFieldsUnits[elementName][animationElementFieldName] as any as Unit,
                value,
            );
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
