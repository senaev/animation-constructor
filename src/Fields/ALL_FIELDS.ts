import { Unit } from '../Unit/Unit';
import { UnitName } from '../Unit/UNIT_NAMES';
import { ColorField } from './ColorField';
import { DegreeField } from './DegreeField';
import { FieldClass } from './Field';
import { PercentField } from './PercentField';
import { PixelField } from './PixelField';

export const ALL_FIELDS: Record<UnitName, FieldClass> = {
    [Unit.color]: ColorField,
    [Unit.percent]: PercentField,
    [Unit.degree]: DegreeField,
    [Unit.pixel]: PixelField,
};
