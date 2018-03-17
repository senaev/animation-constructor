import { PointCoordinates } from '../../../types/PointCoordinates';

export type Square =
    & PointCoordinates
    & {
    size: number;
};
