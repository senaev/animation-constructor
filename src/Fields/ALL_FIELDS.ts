import { Unit } from '../Unit/Unit';
import { ColorField } from './ColorField';
import { DegreeField } from './DegreeField';
import { FieldClass } from './Field';
import { PercentField } from './PercentField';
import { PixelField } from './PixelField';

export const ALL_FIELDS: Record<Unit, FieldClass> = {
    [Unit.color]: ColorField,
    [Unit.percent]: PercentField,
    [Unit.degree]: DegreeField,
    [Unit.pixel]: PixelField,
};
