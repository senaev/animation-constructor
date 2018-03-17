import { AnimationScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { DEFAULT_SCALE_POSITION } from '../../Scale/DEFAULT_SCALE_POSITION';
import { DEFAULT_ZOOM } from '../../Scale/DEFAULT_ZOOM';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';

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
    scaleCoordinates: DEFAULT_SCALE_POSITION,
    zoom: DEFAULT_ZOOM,
    relation: {
        width: 9,
        height: 16,
    },
    animationScript: [],
    animationPosition: 0,
};
