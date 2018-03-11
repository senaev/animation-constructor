import { AnimationScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { DefaultScale } from '../../Scale/DefaultScale';
import { Scale } from '../../Scale/Scale';

export type ConstructorState = {
    editParams: {
        blockLocation: BlockLocation;
    } | undefined,
    scale: Scale;
    animationScript: AnimationScript;
    animationPosition: number;
};

export const defaultConstructorState: ConstructorState = {
    editParams: undefined,
    scale: DefaultScale,
    animationScript: [],
    animationPosition: 0,
};
