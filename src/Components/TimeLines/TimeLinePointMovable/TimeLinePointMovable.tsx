import * as React from 'react';
import { TimeLinePointMovableParams } from '../TimeLinePoint';

type TimeLinePointMovableProps = {
    position: number;
    movable: TimeLinePointMovableParams;
};

export class TimeLinePointMovable extends React.Component<TimeLinePointMovableProps, {}> {
    public render() {
        const {
            // position,
            movable: {
                // min,
                // max,
                // onPositionChange,
            },
        } = this.props;

        // const Field = createNumberField({
        //     unit: Unit.percent,
        //     min,
        //     max,
        // });

        return null;

        // return <Field
        //     value={ position }
        //     onChangeStart={ this.onChangeStart }
        //     onChange={ onPositionChange }
        //     onChangeEnd={ this.onChangeEnd }
        // />;
    }

    // private readonly onChangeStart = () => {
    //     const {
    //         position,
    //         movable: {
    //             onPositionChangeStart,
    //         },
    //     } = this.props;
    //
    //     onPositionChangeStart(position);
    // }
    //
    // private readonly onChangeEnd = () => {
    //     const {
    //         position,
    //         movable: {
    //             onPositionChangeEnd,
    //         },
    //     } = this.props;
    //
    //     onPositionChangeEnd(position);
    // }
}
