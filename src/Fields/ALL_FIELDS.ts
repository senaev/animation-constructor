import { Unit } from '../Unit/Unit';
import { BooleanField } from './BooleanField';
import { ColorField } from './ColorField';
import { DegreeField } from './DegreeField';
import { FieldClass } from './Field';
import { PercentField } from './PercentField';
import { PixelField } from './PixelField';

export const ALL_FIELDS: {
    [key in Unit]: FieldClass<key>;
} = {
    [Unit.color]: ColorField as FieldClass<Unit.color>,
    [Unit.percent]: PercentField as FieldClass<Unit.percent>,
    [Unit.degree]: DegreeField as FieldClass<Unit.degree>,
    [Unit.pixel]: PixelField as FieldClass<Unit.pixel>,
    [Unit.boolean]: BooleanField as FieldClass<Unit.boolean>,
};
