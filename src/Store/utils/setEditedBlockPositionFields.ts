import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { BlockPosition } from '../../BlockPosition/BlockPosition';
import { BlockPositionFieldsTypes } from '../../BlockPosition/BlockPositionFieldsTypes';
import { BlockPositionFieldUnits } from '../../BlockPosition/BlockPositionFieldUnits';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../State';
import { createDefaultUnitScript } from './createDefaultUnitScript';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';
import { getEditedAnimationElementScript } from './getEditedAnimationElementScript';

export function setEditedBlockPositionFields(state: ConstructorState,
                                             blockPositionFields: Partial<BlockPosition>): ConstructorState {

    const {
        animationScript,
    } = state;

    const editedAnimationElementIndex = getEditedAnimationElementBlockLocation(state)[0];
    const editedAnimationElement = getEditedAnimationElementScript(state);

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
