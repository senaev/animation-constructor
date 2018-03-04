import { PointCoordinates } from '../../types/PointCoordinates';

export function getDistanceFromOrigin({ x, y }: PointCoordinates) {
    return Math.sqrt(x ** 2 + y ** 2);
}
