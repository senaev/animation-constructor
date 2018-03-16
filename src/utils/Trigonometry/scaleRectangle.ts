import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';

export function scaleRectangle({
                                   x,
                                   y,
                                   width,
                                   height,
                               }: PointCoordinates & Size, coefficient: number) {
    return {
        x: x - width * (coefficient / 2),
        y: y - width * (coefficient / 2),
        width: width * (coefficient + 1),
        height: height * (coefficient + 1),
    };
}
