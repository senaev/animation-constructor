import { Checkbox } from 'material-ui';
import { ActionDone, ContentClear } from 'material-ui/svg-icons';
import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { Field, FieldPreviewProps } from '../Field';
import * as c from './index.pcss';

const UNIT = Unit.boolean;
type UNIT = typeof UNIT;

export class BooleanField extends Field<UNIT> {
    public static unit = UNIT;
    public static Preview = ({ value }: FieldPreviewProps<UNIT>) => {
        const Icon = value ? ActionDone : ContentClear;

        return <div className={ c.BooleanField__preview }>
            <Icon/>
        </div>;
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
