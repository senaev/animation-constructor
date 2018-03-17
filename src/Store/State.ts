import { AnimationScript } from '../AnimationScript';
import { BlockLocation } from '../BlockLocation/BlockLocation';
import { DEFAULT_RELATION } from '../Scale/DEFAULT_RELATION';
import { DEFAULT_SCALE_COORDINATES } from '../Scale/DEFAULT_SCALE_COORDINATES';
import { DEFAULT_ZOOM } from '../Scale/DEFAULT_ZOOM';
import { PointCoordinates } from '../types/PointCoordinates';
import { Size } from '../types/Size';

export type ConstructorState = {
    editParams: {
        blockLocation: BlockLocation;
    } | undefined,
    scaleCoordinates: PointCoordinates;
    relation: Size,
    zoom: number;
    animationScript: AnimationScript;
    animationPosition: number;
};

export const defaultConstructorState: ConstructorState = {
    editParams: undefined,
    scaleCoordinates: DEFAULT_SCALE_COORDINATES,
    zoom: DEFAULT_ZOOM,
    relation: DEFAULT_RELATION,
    animationScript: [],
    animationPosition: 0,
};
