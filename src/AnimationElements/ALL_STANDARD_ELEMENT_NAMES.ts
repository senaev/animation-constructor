import { getObjectKeys } from '../utils/getObjectKeys';
import { AnimationElements } from './AnimationElements';

export const ALL_STANDARD_ELEMENT_NAMES: (keyof typeof AnimationElements)[] = getObjectKeys(AnimationElements);
