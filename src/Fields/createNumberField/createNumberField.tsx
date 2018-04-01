import NumberInput from 'material-ui-number-input';
import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { UnitShortTitles } from '../../Unit/UnitShortTitles';
import { clamp } from '../../utils/clamp';
import { Field, FieldClass, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

export type NumberFieldProperties<T extends Unit> = {
    unit: T;
    min?: number;
    max?: number;
};

export function createNumberField<T extends Unit>({
                                                      unit,
                                                      min = -Infinity,
                                                      max = Infinity,
                                                  }: NumberFieldProperties<T>): FieldClass<T> {
    return class NumberField extends Field<T> {
        public static unit = unit;
        public static Preview = ({ value }: FieldPreviewProps<T>) => {
            return <div className={ c.NumberField__preview }>
            { `${(value as number).toFixed(2)}${UnitShortTitles[unit]}` }
            </div>;
        }

        public render() {
            return <NumberInput
                id={ 'degree-input-field' }
            value={ String(this.props.value) }
            onChange={ this.onChange }/>;
        }

        private onChange = (event: React.FormEvent<HTMLInputElement>, value: string) => {
            this.props.onChange(clamp(Number(value), min, max));
        }
    };
}
