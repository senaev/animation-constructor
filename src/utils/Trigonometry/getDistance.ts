import { PointCoordinates } from '../../types/PointCoordinates';
import { getRectangleDiagonal } from './getRectangleDiagonal';

export function getDistance(firstPoint: PointCoordinates, secondPoint: PointCoordinates): number {
    return getRectangleDiagonal({
        width: secondPoint.x - firstPoint.x,
        height: secondPoint.y - firstPoint.y,
    });
}
