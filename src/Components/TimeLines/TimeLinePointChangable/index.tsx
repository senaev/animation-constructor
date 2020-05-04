import * as React from 'react';
import { ALL_FIELDS } from '../../../Fields/ALL_FIELDS';
import { FieldClass } from '../../../Fields/Field';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { noop } from '../../../utils/noop';

type TimeLinePointChangableProps<T extends Unit> = {
    unit: T;
    value: UnitTypes[T];
    onChange: (nextValue: UnitTypes[T]) => void;
    requestDialogOpened: (opened: boolean) => void;
};

export class TimeLinePointChangable<T extends Unit> extends React.Component<TimeLinePointChangableProps<T>, {}> {
    public render() {
        const {
            unit,
            value,
            onChange,
        } = this.props;

        const UnitFieldClass: FieldClass<any> = ALL_FIELDS[unit];
        return <div>
            <UnitFieldClass.Preview value={ value }/>
                <UnitFieldClass
                    value={ value }
                    onChangeStart={ noop }
                    onChange={ (nextValue: UnitTypes[T]) => {
                        onChange(nextValue);
                    } }
                    onChangeEnd={ noop }
                />
        </div>;
    }
}
