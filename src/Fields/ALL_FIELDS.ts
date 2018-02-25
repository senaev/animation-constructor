import { Color } from './Color';
import { Degree } from './Degree';
import { FieldClass } from './Field';
import { FieldType } from './FieldType';
import { Percent } from './Percent';
import { Pixel } from './Pixel';

export const ALL_FIELDS: Record<FieldType, FieldClass> = {
    Color,
    Percent,
    Degree,
    Pixel,
};
