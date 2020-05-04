import * as React from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Unit } from '../../Unit/Unit';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

const UNIT = Unit.color;
type UNIT = typeof UNIT;

export class ColorField extends Field<UNIT> {
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        return <div className={ c.ColorField__preview }>
            <div className={ c.ColorField__preview_filler }
                 style={ { backgroundColor: colorToRGBAString(value) } }/>
        </div>;
    };

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
    };
}
