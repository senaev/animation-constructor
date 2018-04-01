import { getStepByPosition } from '../../Animation/util/getStepByPosition';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementScript } from '../../AnimationScript';
import { Block } from '../../Block/Block';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { ConstructorStore } from '../State';
import { addStep } from './addStep';
import { getEditedAnimationElementBlockLocation } from './getEditedAnimationElementBlockLocation';
import { getEditedAnimationElementScript } from './getEditedAnimationElementScript';
import { setStepValue } from './setStepValue';

export function setEditedBlockFieldsOnCurrentPosition(state: ConstructorStore,
                                                      blockFields: Partial<Block>): ConstructorStore {

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
                } as AnimationElementScript<AnimationElements>;
            } else {
                return animationElementScript;
            }
        }),
    };
}
