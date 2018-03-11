import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { Block } from '../../Block/Block';
import { BlockFieldsTypes } from '../../Block/BlockFieldsTypes';
import { BlockFieldUnits } from '../../Block/BlockFieldUnits';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../State';
import { createDefaultUnitScript } from './createDefaultUnitScript';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';
import { getEditedAnimationElementScript } from './getEditedAnimationElementScript';

export function setEditedBlockFieldsOnCurrentPosition(state: ConstructorState,
                                                      blockFields: Partial<Block>): ConstructorState {

    const {
        animationScript,
    } = state;

    const blockLocation = getEditedAnimationElementBlockLocation(state);

    // TODO: circular elements
    const editedAnimationElementIndex = blockLocation[0];
    const editedAnimationElement = getEditedAnimationElementScript(state);

    const {
        elementName,
        blockScript,
        fieldsScript,
    } = editedAnimationElement;

    const nextBlockFieldsScripts = mapObjectValues(
        blockFields,
        (value, blockFieldName) => {
            // const {actions} = blockScript[blockFieldName];
            // const action = getAction

            return createDefaultUnitScript(
                BlockFieldUnits[blockFieldName],
                value as BlockFieldsTypes,
            );
        },
    );

    const nextBlockScript = {
        ...blockScript,
        ...nextBlockFieldsScripts,
    };

    return {
        ...state,
        animationScript: animationScript.map((animationElementScript, i) => {
            if (i === editedAnimationElementIndex) {
                return {
                    elementName,
                    blockScript: nextBlockScript,
                    fieldsScript,
                } as AnimationElementScript<AnimationElementName>;
            } else {
                return animationElementScript;
            }
        }),
    };
}
