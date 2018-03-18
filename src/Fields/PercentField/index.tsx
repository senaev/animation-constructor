import NumberInput from 'material-ui-number-input';
import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { UnitShortTitles } from '../../Unit/UnitShortTitles';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

const UNIT = Unit.percent;
type UNIT = typeof UNIT;

export class PercentField extends Field<UNIT> {
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        return <div className={ c.PercentField__preview }>
            { `${value.toFixed(2)}${UnitShortTitles[UNIT]}` }
        </div>;
    }

    public render() {
        return <NumberInput
            id={ 'percent-input-field' }
            value={ String(this.props.value) }
            onChange={ this.onChange }/>;
    }

    private onChange = (event: React.FormEvent<HTMLInputElement>, value: string) => {
        this.props.onChange(Number(value));
    }
}
