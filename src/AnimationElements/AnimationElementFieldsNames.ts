import { AnimationElements } from './AnimationElements';
import { AnimationElementsFieldsUnits } from './AnimationElementsFieldsUnits';

export type AnimationElementFieldsNames<T extends AnimationElements> = keyof AnimationElementsFieldsUnits[T];
