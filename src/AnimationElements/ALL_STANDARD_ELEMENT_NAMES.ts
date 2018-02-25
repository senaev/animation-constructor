import { getObjectKeys } from '../utils/getObjectKeys';
import { AnimationElementName } from './AnimationElementName';
import { AnimationElements } from './AnimationElements';

export const ALL_STANDARD_ELEMENT_NAMES: AnimationElementName[] = getObjectKeys(AnimationElements);
