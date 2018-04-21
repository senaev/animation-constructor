import { createSelector } from 'reselect';
import { AnimationElementFieldTitles } from '../../AnimationElements/AnimationElementFieldTitles';
import { BlockFieldName } from '../../Block/BlockFieldName';
import { BlockFieldTitles } from '../../Block/BlockFieldTitles';
import { Unit } from '../../Unit/Unit';
import { ConstructorState, StepLocation } from '../ConstructorState';
import { getAnimationElementScriptByBlockLocation } from '../utils/getAnimationElementScriptByBlockLocation';

export function makeGetStepTitleSelector<T extends Record<string, Unit>>({
                                                                             isBlockFieldStep,
                                                                             stepLocation: {
                                                                                 fieldName,
                                                                                 stepIndex,
                                                                             },
                                                                         }: {
    isBlockFieldStep: boolean;
    stepLocation: StepLocation<T>;
}) {
    return createSelector<ConstructorState,
        ConstructorState['editParams'],
        ConstructorState['animationScript'],
        string>([
        ({ editParams }) => editParams,
        ({ animationScript }) => animationScript,
    ], (editParams, animationScript) => {
        if (editParams === undefined) {
            throw new Error('editParams is not initialized on makeGetStepUnitSelector call');
        }

        const {
            blockLocation,
        } = editParams;

        if (isBlockFieldStep) {
            return BlockFieldTitles[fieldName as string as BlockFieldName];
        } else {
            const elementName = getAnimationElementScriptByBlockLocation(animationScript, blockLocation).elementName;

            const animationElementFieldsTitles: Record<string, string> = AnimationElementFieldTitles[elementName];

            return animationElementFieldsTitles[fieldName];
        }
    });
}
