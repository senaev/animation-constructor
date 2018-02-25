import { Unit } from '../UnitName/Unit';
import { UnitName } from '../UnitName/UNIT_NAMES';
import { UnitTypes } from '../UnitName/UnitTypes';
import { AnimationElementName } from './AnimationElementName';

export const AnimationElementsFieldsUnits = {
    Rectangle: {
        color: Unit.color,
        borderRadius: Unit.percent,
    },
};
export type AnimationElementsFieldsUnits = typeof AnimationElementsFieldsUnits;

export type AnimationElementFieldName<T extends AnimationElementName> = keyof AnimationElementsFieldsUnits[T];

export type AnimationElementFieldsTypes<T extends AnimationElementName = AnimationElementName> =
    Record<AnimationElementFieldName<T>, UnitTypes[UnitName]>;

export type AnimationElementsFieldsTypes = Record<AnimationElementName,
    AnimationElementFieldsTypes<AnimationElementName>>;
