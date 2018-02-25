import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';
import { AnimationElementClass } from './AnimationElement';
import { AnimationElementName } from './AnimationElementName';
import { Rectangle } from './Rectangle';

export const ALL_STANDARD_ELEMENTS: Record<AnimationElementName, AnimationElementClass<Record<string, UnitTypes[UnitName]>>> = {
    Rectangle,
};
