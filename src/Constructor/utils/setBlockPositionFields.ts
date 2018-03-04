import { BlockPositionScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { BlockPosition } from '../../BlockPosition/BlockPosition';
import { BlockPositionFieldsTypes } from '../../BlockPosition/BlockPositionFieldsTypes';
import { BlockPositionFieldUnits } from '../../BlockPosition/BlockPositionFieldUnits';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../Store/State';
import { createDefaultUnitScript } from './createDefaultUnitScript';

export function setBlockPositionFields(state: ConstructorState,
                                       blockLocation: BlockLocation,
                                       blockPositionFields: Partial<BlockPosition>): ConstructorState {

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

    const nextBlockPositionFieldsScripts: Partial<BlockPositionScript> = mapObjectValues(
        blockPositionFields,
        (value, blockPositionFieldName) => {
            return createDefaultUnitScript(
                BlockPositionFieldUnits[blockPositionFieldName],
                value as BlockPositionFieldsTypes,
            );
        },
    );

    const nextBlockPositionScript: BlockPositionScript = {
        ...blockPositionScript,
        ...nextBlockPositionFieldsScripts,
    };

    return {
        ...state,
        animationScript: animationScript.map((animationElementScript, i) => {
            if (i === editedAnimationElementNumber) {
                return {
                    elementName,
                    blockPositionScript: nextBlockPositionScript,
                    fieldsScript,
                };
            } else {
                return animationElementScript;
            }
        }),
    };
}
