import * as React from 'react';
import { UnitName } from '../UnitName/UNIT_NAMES';
import { UnitTypes } from '../UnitName/UnitTypes';

export type FieldPreviewProps<T extends UnitName> = Pick<FieldProps<T>, 'value'>;

export type FieldProps<T extends UnitName> = {
    value: UnitTypes[T];
    onChange: (value: UnitTypes[T]) => void;
};

export abstract class Field<T extends UnitName> extends React.Component<FieldProps<T>> {
}

export interface FieldClass<T extends UnitName = UnitName> {
    isSupportsEasing: boolean;
    unit: T;
    Preview: React.SFC<FieldPreviewProps<T>>;

    new(props: FieldProps<T>): Field<T>;
}
