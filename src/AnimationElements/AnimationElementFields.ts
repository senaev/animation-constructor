import { Unit } from '../Unit/Unit';
import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';
import { AnimationElementName } from './AnimationElementName';

export const AnimationElementsFieldsUnits = {
    Rectangle: {
        backgroundColor: Unit.color,
        borderRadius: Unit.percent,
    },
};
export type AnimationElementsFieldsUnits = typeof AnimationElementsFieldsUnits;

export type AnimationElementFieldName<T extends AnimationElementName> = keyof AnimationElementsFieldsUnits[T];

export type AnimationElementFieldsTypes<T extends AnimationElementName = AnimationElementName> =
    Record<AnimationElementFieldName<T>, UnitTypes[UnitName]>;

export type AnimationElementsFieldsTypes = Record<AnimationElementName,
    AnimationElementFieldsTypes<AnimationElementName>>;

export type AnimationElementsFieldsValues = Record<string, UnitTypes[UnitName]>;
