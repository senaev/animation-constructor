import { Scale } from '../../Scale/Scale';
import { ConstructorState } from '../State';

export function setScaleFields(state: ConstructorState,
                               scaleFields: Partial<Scale>): ConstructorState {
    const { scale } = state;

    return {
        ...state,
        scale: {
            ...scale,
            ...scaleFields,
        },
    };
}
