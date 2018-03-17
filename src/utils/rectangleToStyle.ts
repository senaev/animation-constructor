import { PointCoordinates } from '../types/PointCoordinates';
import { Size } from '../types/Size';

export function rectangleToStyle({
                                     x,
                                     y,
                                     width,
                                     height,
                                 }: PointCoordinates & Size): {
    top: string;
    left: string;
    width: string;
    height: string;
} {
    return {
        top: `${y}%`,
        left: `${x}%`,
        width: `${width}%`,
        height: `${height}%`,
    };
}
