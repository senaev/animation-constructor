import { Fields } from '../Fields';
import { FieldType } from '../Fields/FieldType';
import { BlockPositionFieldName } from './BlockPositionFieldName';

export const BlockPositionFielsTypes: Record<BlockPositionFieldName, FieldType> = {
    x: Fields.Percent,
    y: Fields.Percent,
    height: Fields.Percent,
    width: Fields.Percent,
    rotation: Fields.Degree,
};
