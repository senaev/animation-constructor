import { createSelector } from 'reselect';
import { AnimationElementFieldsNames } from '../../AnimationElements/AnimationElementFieldsNames';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { BlockFieldName } from '../../Block/BlockFieldName';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { ConstructorState, StepLocation } from '../ConstructorState';
import { getAnimationElementScriptByBlockLocation } from '../utils/getAnimationElementScriptByBlockLocation';

export function makeGetStepValueSelector<T extends Record<string, Unit>>({
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
        UnitTypes[T[keyof T]]>([
        ({ editParams }) => editParams,
        ({ animationScript }) => animationScript,
    ], (editParams, animationScript) => {
        if (editParams === undefined) {
            throw new Error('editParams is not initialized on makeGetStepValueSelector call');
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

        return steps[stepIndex].value;
    });
}
