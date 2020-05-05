import * as React from 'react';
import { NumberUnit } from '../../Unit/NumberUnit';
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

export function createNumberField<T extends NumberUnit>({
                                                      unit,
                                                      min = -Infinity,
                                                      max = Infinity,
                                                  }: NumberFieldProperties<T>): FieldClass<T> {
    return class NumberField extends Field<T> {
        public static unit = unit;

        private inputElement?: HTMLInputElement | null;

        public static Preview = ({ value }: FieldPreviewProps<T>) => {
            return <div className={ c.NumberField__Preview }>
                { `${(value as number).toFixed(2)}${UnitShortTitles[unit]}` }
            </div>;
        }

        public render() {
            const {
                onChangeStart,
                onChangeEnd,
            } = this.props;

            return <input
                className={ c.NumberField }
                ref={ (element) => {
                    this.inputElement = element;
                } }
                value={ String(this.props.value) }
                onChange={ this.onChange }
                onFocus={ onChangeStart }
                onBlur={ onChangeEnd }
            />;
        }

        private onChange = () => {
            const { inputElement } = this;

            if (!inputElement) {
                throw new Error('NumberField error: inputElement has not been initialized');
            }

            this.props.onChange(clamp(Number(inputElement.value), min, max));
        }
    };
}
