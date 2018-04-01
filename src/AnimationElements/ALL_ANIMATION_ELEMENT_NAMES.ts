import { getObjectKeys } from '../utils/getObjectKeys';
import { AnimationElements } from './AnimationElements';

export const ALL_ANIMATION_ELEMENT_NAMES: AnimationElements[] = getObjectKeys(AnimationElements);
