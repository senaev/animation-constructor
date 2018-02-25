import { BlockSize, PointCoordinates } from '../../BlockPosition/BlockPosition';

export function getRectangleCenterCoordinates({ x, y, width, height }: PointCoordinates & BlockSize): PointCoordinates {
    return {
        x: x + width / 2,
        y: y + height / 2,
    };
}
