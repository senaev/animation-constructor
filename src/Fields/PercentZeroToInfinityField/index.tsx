import NumberInput from 'material-ui-number-input';
import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { UnitShortTitles } from '../../Unit/UnitShortTitles';
import { clamp } from '../../utils/clamp';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

const UNIT = Unit.degree;
type UNIT = typeof UNIT;

export class PercentZeroToInfinityField extends Field<UNIT> {
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        return <div className={ c.PercentZeroToInfinityField__preview }>
            { `${value.toFixed(2)}${UnitShortTitles[UNIT]}` }
        </div>;
    }

    public render() {
        return <NumberInput
            id={ 'degree-input-field' }
            value={ String(this.props.value) }
            onChange={ this.onChange }/>;
    }

    private onChange = (event: React.FormEvent<HTMLInputElement>, value: string) => {
        this.props.onChange(clamp(Number(value), 0, Infinity));
    }
}
