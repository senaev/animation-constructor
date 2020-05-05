import * as React from 'react';
import { createNumberField } from '../../../Fields/createNumberField/createNumberField';
import { noop } from '../../../utils/noop';
import { TimeLinePointMovableParams } from '../TimeLinePoint';

type TimeLinePointMovableProps = {
    position: number;
    movable: TimeLinePointMovableParams;
    onChange: (nextPosition: number) => void;
};

export class TimeLinePointMovable extends React.Component<TimeLinePointMovableProps, {}> {
    public render() {
        const {
            position,
            movable: {
                min,
                max,
            },
        } = this.props;

        const Field = createNumberField({
            unit: 'percent',
            min,
            max,
        });

        return <Field
            value={ position }
            onChangeStart={ noop }
            onChange={ this.props.onChange }
            onChangeEnd={ noop }
        />;
    }
}
