import { UnitsToTypes } from '../Unit/UnitsToTypes';
import { AnimationElementName } from './AnimationElementName';
import { AnimationElementsFieldsUnits } from './AnimationElementsFieldsUnits';

export type AnimationElementFieldsTypes<T extends AnimationElementName> = UnitsToTypes<AnimationElementsFieldsUnits[T]>;
