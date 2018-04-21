import * as cx from 'classnames';
import { Checkbox } from 'material-ui';
import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

const UNIT = Unit.boolean;
type UNIT = typeof UNIT;

export class BooleanField extends Field<UNIT> {
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        return <div className={ cx(
            c.BooleanField__preview,
            value
                ? c.BooleanField__preview_done
                : c.BooleanField__preview_clear
        ) }/>;
    }

    public render() {
        return <Checkbox
            checked={ this.props.value }
            onCheck={ (event, value) => {
                this.props.onChange(value);
            } }
        />;
    }
}
