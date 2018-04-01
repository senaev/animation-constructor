import * as React from 'react';
import { Unit } from '../../../Unit/Unit';
import { TimeLinePoint, TimeLinePointOwnProps } from '../TimeLinePoint/index';
import * as c from './index.pcss';

export type TimeLineProps = {
    points: TimeLinePointOwnProps<Unit>[];
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
                    return <TimeLinePoint
                        key={ i }
                        { ...pointProps }
                    />;
                })
            }
        </div>;
    }
}
