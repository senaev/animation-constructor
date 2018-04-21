import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { ConstructorState } from '../ConstructorState';

export function getEditedAnimationElementBlockLocation(state: ConstructorState): BlockLocation {
    const {
        editParams,
    } = state;

    if (editParams === undefined) {
        throw new Error('editParams should be set on FieldsTimeLines initialization');
    }

    return editParams.blockLocation;
}
