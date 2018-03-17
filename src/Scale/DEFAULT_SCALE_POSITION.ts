import { PointCoordinates } from '../types/PointCoordinates';
import { DEFAULT_ZOOM } from './DEFAULT_ZOOM';

export const DEFAULT_SCALE_POSITION: PointCoordinates = {
    x: ((1 - DEFAULT_ZOOM) / 2) * 100,
    y: ((1 - DEFAULT_ZOOM) / 2) * 100,
};
