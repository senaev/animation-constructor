import * as React from 'react';
import { Unit } from '../../../Unit/Unit';
import { TimeLinePointConnected, TimeLinePointOwnProps } from '../TimeLinePoint/connected';
import * as c from './index.pcss';

export type TimeLineProps = {
    points: TimeLinePointOwnProps<Record<string, Unit>, string>[];
};

export class TimeLine extends React.Component<TimeLineProps, {}> {
    public render() {
        const {
            points,
            children,
        } = this.props;

        return <div className={ c.TimeLine }>
            <div className={ c.TimeLine__content }>{ children }</div>
            {
                points.map((pointProps, i) => {
                    return <TimeLinePointConnected
                        key={ i }
                        { ...pointProps }
                    />;
                })
            }
        </div>;
    }
}
