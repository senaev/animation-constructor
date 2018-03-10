import { TextFieldProps } from 'material-ui';
import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { colorStringToColor } from '../../utils/colorStringToColor';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

// TODO: use other color picker
const MaterialUiColorPicker: React.ComponentClass<TextFieldProps> = require('material-ui-color-picker');

const UNIT = Unit.color;
type UNIT = typeof UNIT;

export class ColorField extends Field<UNIT> {
    public static isSupportsEasing = true;
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        return <div className={ c.ColorField__preview }>
            <div className={ c.ColorField__preview_filler }
                 style={ { backgroundColor: colorToRGBAString(value) } }/>
        </div>;
    }

    public render() {
        const colorString = colorToRGBAString(this.props.value);

        return <MaterialUiColorPicker
            id={ 'color-input-field' }
            defaultValue={ colorString }
            hintText={ 'Цвет' }
            onChange={ this.onChange }
        />;
    }

    private onChange = (color: any) => {
        this.props.onChange(colorStringToColor(color as string));
    }
}
