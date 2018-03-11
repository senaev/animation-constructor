import { getActionByPosition } from '../../Animation/util/getActionByPosition';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { Block } from '../../Block/Block';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../State';
import { addAction } from './addAction';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';
import { getEditedAnimationElementScript } from './getEditedAnimationElementScript';
import { setActionValue } from './setActionValue';

export function setEditedBlockFieldsOnCurrentPosition(state: ConstructorState,
                                                      blockFields: Partial<Block>): ConstructorState {

    const {
        animationPosition,
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
            const {
                unit,
                actions,
            } = blockScript[blockFieldName];

            const {
                actionPosition,
                index,
            } = getActionByPosition(animationPosition, actions);

            return {
                unit,
                actions: actionPosition === animationPosition
                    ? setActionValue(actions, index, value!)
                    : addAction(actions, animationPosition, value!),
            };
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
