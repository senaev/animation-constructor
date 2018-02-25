import { Unit } from '../UnitName/Unit';
import { UnitNamesObjectToUnitsObject } from '../UnitName/UnitNamesObjectToUnitsObject';
import { FieldType } from './FieldType';

export type FieldTypesUnits = {
    Color: Unit.color;
    Percent: Unit.percent;
    Degree: Unit.degree;
    Pixel: Unit.pixel;
};

export type FieldTypes = UnitNamesObjectToUnitsObject<FieldTypesUnits>;

export type TypeOfField<T extends FieldType> = FieldTypes[T];
