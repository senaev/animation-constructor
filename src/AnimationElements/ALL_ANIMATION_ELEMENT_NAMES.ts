import { getObjectKeys } from '../utils/getObjectKeys';
import { AnimationElementName } from './AnimationElementName';
import { AnimationElements } from './AnimationElements';

export const ALL_ANIMATION_ELEMENT_NAMES: AnimationElementName[] = getObjectKeys(AnimationElements);
