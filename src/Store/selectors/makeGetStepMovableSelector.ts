import { createSelector } from 'reselect';
import { AnimationElementFieldsNames } from '../../AnimationElements/AnimationElementFieldsNames';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { getStepsParams } from '../../AnimationScript/utils/getStepsParams';
import { BlockFieldName } from '../../Block/BlockFieldName';
import { TimeLinePointMovableParams } from '../../Components/TimeLines/TimeLinePoint';
import { Unit } from '../../Unit/Unit';
import { ConstructorState, StepLocation } from '../ConstructorState';
import { getAnimationElementScriptByBlockLocation } from '../utils/getAnimationElementScriptByBlockLocation';

export function makeGetStepMovableSelector<T extends Record<string, Unit>>({
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
        TimeLinePointMovableParams | undefined>([
        ({ editParams }) => editParams,
        ({ animationScript }) => animationScript,
    ], (editParams, animationScript) => {
        if (editParams === undefined) {
            throw new Error('editParams is not initialized on makeGetStepMovableSelector call');
        }

        const {
            blockLocation,
        } = editParams;

        const {
            blockScript,
            fieldsScript,
        } = getAnimationElementScriptByBlockLocation(animationScript, blockLocation);
        const { steps } = isBlockFieldStep
            ? blockScript[fieldName as BlockFieldName]
            : fieldsScript[fieldName as AnimationElementFieldsNames<AnimationElements>];

        if (stepIndex === 0) {
            return undefined;
        } else {
            const {
                previousStepPosition,
                nextStepPosition,
            } = getStepsParams(steps)[stepIndex];

            if (previousStepPosition === undefined) {
                throw new Error('PointParams without previousPosition value in not first point');
            }

            return {
                min: previousStepPosition,
                max: nextStepPosition === undefined
                    ? 1
                    : nextStepPosition,
            };
        }
    });
}
