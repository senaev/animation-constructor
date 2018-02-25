import { PointCoordinates } from '../../BlockPosition/BlockPosition';

export function getDistanceFromOrigin({ x, y }: PointCoordinates) {
    return Math.sqrt(x ** 2 + y ** 2);
}
