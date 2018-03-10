import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { BlockPosition } from '../../BlockPosition/BlockPosition';
import { BlockPositionFieldsTypes } from '../../BlockPosition/BlockPositionFieldsTypes';
import { BlockPositionFieldUnits } from '../../BlockPosition/BlockPositionFieldUnits';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../State';
import { createDefaultUnitScript } from './createDefaultUnitScript';

export function setBlockPositionFields(state: ConstructorState,
                                       blockLocation: BlockLocation,
                                       blockPositionFields: Partial<BlockPosition>): ConstructorState {

    const {
        animationScript,
    } = state;

    const editedAnimationElementIndex = blockLocation[0];
    const editedAnimationElement = animationScript[editedAnimationElementIndex];

    const {
        elementName,
        blockPositionScript,
        fieldsScript,
    } = editedAnimationElement;

    const nextBlockPositionFieldsScripts = mapObjectValues(
        blockPositionFields,
        (value, blockPositionFieldName) => {
            return createDefaultUnitScript(
                BlockPositionFieldUnits[blockPositionFieldName],
                value as BlockPositionFieldsTypes,
            );
        },
    );

    const nextBlockPositionScript = {
        ...blockPositionScript,
        ...nextBlockPositionFieldsScripts,
    };

    return {
        ...state,
        animationScript: animationScript.map((animationElementScript, i) => {
            if (i === editedAnimationElementIndex) {
                return {
                    elementName,
                    blockPositionScript: nextBlockPositionScript,
                    fieldsScript,
                } as AnimationElementScript<AnimationElementName>;
            } else {
                return animationElementScript;
            }
        }),
    };
}
