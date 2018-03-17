import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { Square } from './Types/Square';

export function getCentralSquareOfRectangle({
                                                x,
                                                y,
                                                width,
                                                height,
                                            }: PointCoordinates & Size): Square {
    const size = width > height
        ? height
        : width;

    return {
        size,
        x: x + (width > height
            ? (width - size) / 2
            : 0),
        y: y + (width > height
            ? 0
            : (height - size) / 2),
    };
}
