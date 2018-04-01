import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { ConstructorStore } from '../State';

export function getEditedAnimationElementBlockLocation(state: ConstructorStore): BlockLocation {
    const {
        editParams,
    } = state;

    if (editParams === undefined) {
        throw new Error('editParams should be set on FieldsTimeLines initialization');
    }

    return editParams.blockLocation;
}
