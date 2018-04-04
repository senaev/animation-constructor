import * as React from 'react';
import { createNumberField } from '../../../Fields/createNumberField/createNumberField';
import { Unit } from '../../../Unit/Unit';
import { TimeLinePointMovableParams } from '../TimeLinePoint/index';

type TimeLinePointMovableProps = {
    position: number;
    movable: TimeLinePointMovableParams;
};

export class TimeLinePointMovable extends React.Component<TimeLinePointMovableProps, {}> {
    public render() {
        const {
            position,
            movable: {
                min,
                max,
                onPositionChange,
            },
        } = this.props;

        const Field = createNumberField({
            unit: Unit.percent,
            min,
            max,
        });

        return <Field
            value={ position }
            onChangeStart={ this.onChangeStart }
            onChange={ onPositionChange }
            onChangeEnd={ this.onChangeEnd }
        />;
    }

    private readonly onChangeStart = () => {
        const {
            position,
            movable: {
                onPositionChangeStart,
            },
        } = this.props;

        onPositionChangeStart(position);
    }

    private readonly onChangeEnd = () => {
        const {
            position,
            movable: {
                onPositionChangeEnd,
            },
        } = this.props;

        onPositionChangeEnd(position);
    }
}
