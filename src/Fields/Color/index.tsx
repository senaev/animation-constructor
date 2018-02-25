import { TextFieldProps } from 'material-ui';
import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

// TODO: use other color picker
const MaterialUiColorPicker: React.ComponentClass<TextFieldProps> = require('material-ui-color-picker');

const UNIT = Unit.color;
type UNIT = typeof UNIT;

export class Color extends Field<UNIT> {
    public static isSupportsEasing = true;
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        return <div className={ c.ColorPreview }>
            <div className={ c.ColorPreview_filler }
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
