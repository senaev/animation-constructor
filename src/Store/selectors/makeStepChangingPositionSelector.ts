import { createSelector } from 'reselect';
import { Unit } from '../../Unit/Unit';
import { getObjectKeys } from '../../utils/getObjectKeys';
import { ChangingPositionStep, ConstructorStore } from '../State';

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

export function makeStepChangingPositionSelector<T extends Record<string, Unit>>(originalChangingPositionStep: ChangingPositionStep<T>) {
    return createSelector<ConstructorStore,
        ConstructorStore['editParams'],
        boolean>([
        ({ editParams }) => editParams,
    ], (editParams) => {
        if (!editParams) {
            throw new Error('editParams is not initialized');
        }

        const {
            changingPositionStep,
        } = editParams;

        if (changingPositionStep === undefined) {
            return false;
        }

        return areObjectPropertiesEqual(changingPositionStep as ChangingPositionStep<Record<string, Unit>>, originalChangingPositionStep);
    });
}
