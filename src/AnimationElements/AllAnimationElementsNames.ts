import { getObjectKeys } from '../utils/getObjectKeys';
import { AllAnimationElements } from './AllAnimationElements';
import { AnimationElements } from './AnimationElements';

export const AllAnimationElementsNames: AnimationElements[] = getObjectKeys(AllAnimationElements);
