import * as React from 'react';
import { Unit } from '../../../Unit/Unit';
import { TimeLinePointConnected, TimeLinePointConnectedOwnProps } from '../TimeLinePoint/connected';
import * as c from './index.pcss';

export type TimeLineProps = {
    points: TimeLinePointConnectedOwnProps<Record<string, Unit>>[];
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
