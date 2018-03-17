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
    // TODO: number
    zoom: Size;
    animationScript: AnimationScript;
    animationPosition: number;
};

export const defaultConstructorState: ConstructorState = {
    editParams: undefined,
    scaleCoordinates: DEFAULT_SCALE_POSITION,
    zoom: {
        width: DEFAULT_ZOOM * 100,
        height: DEFAULT_ZOOM * 100,
    },
    animationScript: [],
    animationPosition: 0,
};
