import { Unit } from '../Unit/Unit';
import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';
import { AnimationElementName } from './AnimationElementName';

type FieldDescription<T extends UnitName> = {
    fieldTitle: string;
    unit: T;
    value: UnitTypes[T];
};

type FieldsDescription = Record<string, FieldDescription<UnitName>>;

export const AllAnimationElementsDescriptions: Record<AnimationElementName, FieldsDescription> = {
    Rectangle: {
        backgroundColor: {
            fieldTitle: 'Цвет заливки',
            unit: Unit.color,
            value: '#0088ec',
        },
        borderRadius: {
            fieldTitle: 'Радиус скругления',
            unit: Unit.percent,
            value: 0,
        },
    },
};
