import { getStepByPosition } from '../../Animation/util/getStepByPosition';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { Block } from '../../Block/Block';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorState } from '../State';
import { addStep } from './addStep';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';
import { getEditedAnimationElementScript } from './getEditedAnimationElementScript';
import { setStepValue } from './setStepValue';

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
                steps,
            } = blockScript[blockFieldName];

            const {
                stepPosition,
                stepIndex,
            } = getStepByPosition(animationPosition, steps);

            return {
                unit,
                steps: stepPosition === animationPosition
                    ? setStepValue(steps, stepIndex, value!)
                    : addStep(steps, animationPosition, value!),
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
