import { OneDimensionalLineSegment } from './Types/OneDimensionalLineSegment';

export function scaleOneDimensionalLineSegment({
                                                   beginning,
                                                   length,
                                               }: OneDimensionalLineSegment,
                                               scaleCenter: number,
                                               coefficient: number): OneDimensionalLineSegment {
    const center = beginning + length / 2;
    const nextCenter = (center - scaleCenter) * coefficient + scaleCenter;

    const nextLength = length * coefficient;
    const nextBeginning = nextCenter - nextLength / 2;

    return {
        beginning: nextBeginning,
        length: nextLength,
    };
}
