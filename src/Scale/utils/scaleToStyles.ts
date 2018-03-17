import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';

export function scaleToStyles({
                                  y,
                                  x,
                              }: PointCoordinates,
                              {
                                  width,
                                  height,
                              }: Size): {
    top: string;
    left: string;
    width: string;
    height: string;
} {
    return {
        top: `${y}%`,
        left: `${x}%`,
        height: `${height}%`,
        width: `${width}%`,
    };
}
