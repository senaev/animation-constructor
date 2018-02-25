import NumberInput from 'material-ui-number-input';
import * as React from 'react';
import { Unit } from '../../UnitName/Unit';
import { UnitShortTitles } from '../../UnitName/UnitShortTitles';
import { addStylesToPage } from '../../utils/addStylesToPage';
import { Field, FieldPreviewProps } from '../Field';

addStylesToPage(document, require('./index.css'));

const UNIT = Unit.degree;
type UNIT = typeof UNIT;

export class Degree extends Field<UNIT> {
    public static isSupportsEasing = true;
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        return <div className={ 'DegreePreview' }>
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
        this.props.onChange(Number(value));
    }
}
