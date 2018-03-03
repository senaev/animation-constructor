import { Unit } from '../Unit/Unit';
import { UnitName } from '../Unit/UNIT_NAMES';
import { AnimationElementName } from './AnimationElementName';

export const AnimationElementsFieldsUnits: Record<AnimationElementName, Record<string, UnitName>> = {
    Rectangle: {
        backgroundColor: Unit.color,
        borderRadius: Unit.percent,
    },
};
export type AnimationElementsFieldsUnits = typeof AnimationElementsFieldsUnits;
