import { PointCoordinates } from '../../types/PointCoordinates';
import { Line } from './Line';

export function getLinesIntersectionPoint(firstLine: Line, secondLine: Line): PointCoordinates | undefined {
    if (firstLine.k === secondLine.k) {
        // parallel lines
        return undefined;
    } else {
        const x = (secondLine.b - firstLine.b) / (firstLine.k - secondLine.k);
        return {
            x,
            y: firstLine.k * x,
        };
    }
}
