import { FieldType } from './FieldType';
import { FieldTypes } from './FieldTypes';

export type FieldDescription<T extends FieldType = FieldType> = {
    fieldTitle: string;
    fieldType: T;
    value: FieldTypes[FieldType],
};
