import { UnitsToTypes } from '../Unit/UnitsToTypes';
import { AnimationElements } from './AnimationElements';
import { AnimationElementsFieldsUnits } from './AnimationElementsFieldsUnits';

export type AnimationElementFieldsTypes<T extends AnimationElements> = UnitsToTypes<AnimationElementsFieldsUnits[T]>;
