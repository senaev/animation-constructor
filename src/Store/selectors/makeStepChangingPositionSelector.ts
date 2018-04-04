import { createSelector } from 'reselect';
import { Unit } from '../../Unit/Unit';
import { getObjectKeys } from '../../utils/getObjectKeys';
import { ConstructorStore, StepLocation } from '../ConstructorStore';

function areObjectPropertiesEqual<T extends Record<string, any>>(first: T, second: T): boolean {
    const firstKeys = getObjectKeys(first);
    const secondKeys = getObjectKeys(second);

    if (firstKeys.length !== secondKeys.length) {
        return false;
    }

    for (const i in firstKeys) {
        if (firstKeys[i] !== secondKeys[i]) {
            return false;
        }
    }

    return true;
}

export function makeStepChangingPositionSelector<T extends Record<string, Unit>>(originalStepLocation: StepLocation<T>) {
    return createSelector<ConstructorStore,
        ConstructorStore['editParams'],
        boolean>([
        ({ editParams }) => editParams,
    ], (editParams) => {
        if (!editParams) {
            throw new Error('editParams is not initialized');
        }

        const {
            blockChangingPositionStepLocation,
        } = editParams;

        if (blockChangingPositionStepLocation === undefined) {
            return false;
        }

        return areObjectPropertiesEqual(blockChangingPositionStepLocation as StepLocation<Record<string, Unit>>, originalStepLocation);
    });
}
