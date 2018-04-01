import { Unit } from '../Unit/Unit';
import { BooleanField } from './BooleanField';
import { ColorField } from './ColorField';
import { createNumberField } from './createNumberField/createNumberField';
import { FieldClass } from './Field';

export const ALL_FIELDS: {
    [key in Unit]: FieldClass<key>;
} = {
    [Unit.color]: ColorField as FieldClass<Unit.color>,
    [Unit.percent]: createNumberField({
        unit: Unit.percent,
    }),
    [Unit.percentZeroToInfinity]: createNumberField({
        unit: Unit.percentZeroToInfinity,
        min: 0,
    }),
    [Unit.degree]: createNumberField({
        unit: Unit.degree,
    }),
    [Unit.pixel]: createNumberField({
        unit: Unit.pixel,
    }),
    [Unit.boolean]: BooleanField as FieldClass<Unit.boolean>,
};
