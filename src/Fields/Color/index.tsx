import { TextFieldProps } from 'material-ui';
import * as React from 'react';
import { Unit } from '../../UnitName/Unit';
import { addStylesToPage } from '../../utils/addStylesToPage';
import { Field, FieldPreviewProps } from '../Field';

const MaterialUiColorPicker: React.ComponentClass<TextFieldProps> = require('material-ui-color-picker');
addStylesToPage(document, require('./index.css'));

const UNIT = Unit.color;
type UNIT = typeof UNIT;

export class Color extends Field<UNIT> {
    public static isSupportsEasing = true;
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        return <div className={ 'ColorPreview' }>
            <div className={ 'ColorPreview_filler' }
                 style={ { backgroundColor: value } }/>
        </div>;
    }

    public render() {
        return <MaterialUiColorPicker
            id={ 'color-input-field' }
            defaultValue={ this.props.value }
            hintText={ 'Цвет' }
            onChange={ this.onChange }
        />;
    }

    private onChange = (color: any) => {
        this.props.onChange(color);
    }
}
