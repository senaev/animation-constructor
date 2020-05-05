import * as React from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

export class ColorField extends Field<'color'> {
    public static unit = 'color';
    public static Preview = ({ value }: FieldPreviewProps<'color'>) => {
        return <div className={ c.ColorField__preview }>
            <div className={ c.ColorField__preview_filler }
                 style={ { backgroundColor: colorToRGBAString(value) } }/>
        </div>;
    }

    public render () {
        const colorString = colorToRGBAString(this.props.value);

        return <SketchPicker
            color={ colorString }
            onChange={ this.onChange }
        />;
    }

    private onChange = ({ rgb }: ColorResult) => {
        this.props.onChange({
            ...rgb,
            a: rgb.a || 1,
        });
    }
}
