import * as cx from 'classnames';
import * as React from 'react';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

export class BooleanField extends Field<'boolean'> {
    public static unit = 'boolean';
    public static Preview = ({ value }: FieldPreviewProps<'boolean'>) => {
        return <div className={ cx(
            c.BooleanField__preview,
            value
                ? c.BooleanField__preview_done
                : c.BooleanField__preview_clear
        ) }/>;
    }

    public render() {
        return <input
            type='checkbox'
            checked={ this.props.value }
            onChange={ this.onChange }
        />;
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.checked);
    }
}
