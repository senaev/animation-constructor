import { mirrorObject } from '../utils/Mirror/mirrorObject';
import { AllAnimationElements } from './AllAnimationElements';

export const AnimationElements = mirrorObject(AllAnimationElements);
export type AnimationElements = keyof typeof AnimationElements;
