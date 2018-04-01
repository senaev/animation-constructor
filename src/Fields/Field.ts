import * as React from 'react';
import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';

export type FieldPreviewProps<T extends Unit> = Pick<FieldProps<T>, 'value'>;

export type FieldProps<T extends Unit> = {
    value: UnitTypes[T];
    onChangeStart: () => void;
    onChange: (value: UnitTypes[T]) => void;
    onChangeEnd: () => void;
};

export abstract class Field<T extends Unit> extends React.Component<FieldProps<T>> {
}

export interface FieldClass<T extends Unit> {
    unit: T;
    Preview: React.SFC<FieldPreviewProps<T>>;

    new(props: FieldProps<T>): Field<T>;
}
