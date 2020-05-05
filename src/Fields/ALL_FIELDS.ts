import { Unit } from '../Unit/Unit';
import { BooleanField } from './BooleanField';
import { ColorField } from './ColorField';
import { createNumberField } from './createNumberField/createNumberField';
import { FieldClass } from './Field';

export const ALL_FIELDS: {
    [key in Unit]: FieldClass<key>;
} = {
    color: ColorField as FieldClass<'color'>,
    percent: createNumberField({
        unit: 'percent',
    }),
    percentZeroToInfinity: createNumberField({
        unit: 'percentZeroToInfinity',
        min: 0,
    }),
    degree: createNumberField({
        unit: 'degree',
    }),
    pixel: createNumberField({
        unit: 'pixel',
    }),
    boolean: BooleanField as FieldClass<'boolean'>,
};
