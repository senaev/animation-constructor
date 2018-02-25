import { PointCoordinates } from '../../BlockPosition/BlockPosition';
import { Line } from './Line';

export function getPerpendicularLineByPoint(baseLine: Line, { x, y }: PointCoordinates): Line {
    const k = -1 / baseLine.k;
    return {
        k,
        b: y - x * k,
    };
}
