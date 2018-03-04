import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';

export function getRectangleCenterCoordinates({ x, y, width, height }: PointCoordinates & Size): PointCoordinates {
    return {
        x: x + width / 2,
        y: y + height / 2,
    };
}
