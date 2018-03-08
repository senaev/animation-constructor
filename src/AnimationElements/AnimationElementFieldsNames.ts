import { AnimationElementName } from './AnimationElementName';
import { AnimationElementsFieldsUnits } from './AnimationElementsFieldsUnits';

export type AnimationElementFieldsNames<T extends AnimationElementName> = keyof AnimationElementsFieldsUnits[T];
