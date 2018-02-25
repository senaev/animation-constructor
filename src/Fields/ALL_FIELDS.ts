import { Unit } from '../Unit/Unit';
import { UnitName } from '../Unit/UNIT_NAMES';
import { Color } from './Color';
import { Degree } from './Degree';
import { FieldClass } from './Field';
import { Percent } from './Percent';
import { Pixel } from './Pixel';

export const ALL_FIELDS: Record<UnitName, FieldClass> = {
    [Unit.color]: Color,
    [Unit.percent]: Percent,
    [Unit.degree]: Degree,
    [Unit.pixel]: Pixel,
};
