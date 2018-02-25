import * as React from 'react';
import { TimelinePoint, TimelinePointProps } from '../TimelinePoint';
import * as c from './index.pcss';

export type TimelineProps = {
    timelinePoints: TimelinePointProps[],
};

export class Timeline extends React.Component<TimelineProps, {}> {
    public render() {
        const {
            timelinePoints,
        } = this.props;

        return <div className={ c.Timeline }>
            <div className={ c.Timeline__content }>{ this.props.children }</div>
            {
                timelinePoints.map((timelinePointProps, key) => <TimelinePoint
                    key={ key }
                    { ...timelinePointProps }
                />)
            }
        </div>;
    }
}
