import { createSelector } from 'reselect';
import { Unit } from '../../Unit/Unit';
import { areObjectPropertiesEqual } from '../../utils/areObjectPropertiesEqual';
import { ConstructorState, StepLocation } from '../ConstructorState';

export function makeStepChangingPositionSelector<T extends Record<string, Unit>>({
                                                                                     isBlockFieldStep,
                                                                                     stepLocation,
                                                                                 }: {
    isBlockFieldStep: boolean;
    stepLocation: StepLocation<T>;
}) {
    return createSelector<ConstructorState,
        ConstructorState['editParams'],
        boolean>([
        ({ editParams }) => editParams,
    ], (editParams) => {
        if (editParams === undefined) {
            throw new Error('editParams is not initialized on makeStepChangingPositionSelector call');
        }

        const {
            blockChangingPositionStepLocation,
            elementFieldChangingPositionStepLocation,
        } = editParams;

        const changingPositoinStepLocation = isBlockFieldStep
            ? blockChangingPositionStepLocation
            : elementFieldChangingPositionStepLocation;

        if (changingPositoinStepLocation === undefined) {
            return false;
        }

        return areObjectPropertiesEqual(changingPositoinStepLocation, stepLocation);
    });
}
