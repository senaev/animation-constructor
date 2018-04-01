import { mirrorObject } from '../utils/Mirror/mirrorObject';
import { ALL_ANIMATION_ELEMENTS } from './ALL_ANIMATION_ELEMENTS';

export const AnimationElements = mirrorObject(ALL_ANIMATION_ELEMENTS);
export type AnimationElements = keyof typeof AnimationElements;
