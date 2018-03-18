import * as cx from 'classnames';
import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { TimeLinePreviewProps } from '../UnitTimeLinePreviews';
import * as c from './index.pcss';

export class BooleanTimeLinePreview extends React.Component<TimeLinePreviewProps<Unit.boolean>> {
    public render() {
        return <div className={ c.BooleanTimeLinePreview }>
            {
                this.props.unitScript.steps.map(({
                                                     duration,
                                                     value,
                                                 }, i) => {
                    const className = cx(
                        c.BooleanTimeLinePreview__step,
                        value
                            ? c.BooleanTimeLinePreview__step_exists
                            : c.BooleanTimeLinePreview__step_notExists
                    );

                    return <div
                        key={ i }
                        className={ className }
                        style={ {
                            width: `${duration * 100}%`,
                        } }
                    />;
                })
            }
        </div>;
    }
}
