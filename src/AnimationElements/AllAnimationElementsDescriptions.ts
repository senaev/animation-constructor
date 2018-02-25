import { Fields } from '../Fields';
import { FieldDescription } from '../Fields/FieldDescription';
import { AnimationElementFieldName } from './AnimationElementFields';
import { AnimationElementName } from './AnimationElementName';

type FieldDescriptionWrapper<T extends AnimationElementName = AnimationElementName> =
    Record<AnimationElementFieldName<T>, FieldDescription>;

export type AnimationElementDescription<T extends AnimationElementName> = {
    fieldsDescriptions: FieldDescriptionWrapper<T>;
};

export type AllAnimationElementsDescriptions<T extends AnimationElementName> = Record<T,
    AnimationElementDescription<T>>;

export const AllAnimationElementsFlexibilities: Record<AnimationElementName, boolean> = {
    Rectangle: true,
};

export const AllAnimationElementsDescriptions: Record<AnimationElementName,
    FieldDescriptionWrapper<AnimationElementName>> = {
    Rectangle: {
        color: {
            fieldTitle: 'Цвет заливки',
            fieldType: Fields.Color,
            value: '#0088ec',
        },
        borderRadius: {
            fieldTitle: 'Радиус скругления',
            fieldType: Fields.Percent,
            value: 0,
        },
    },
};
