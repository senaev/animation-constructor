import * as React from 'react';
import { addStylesToPage } from '../../../utils/addStylesToPage';
import { TimelinePoint, TimelinePointProps } from '../TimelinePoint';

export type TimelineProps = {
    timelinePoints: TimelinePointProps[],
};

// TODO
addStylesToPage(document, require('./index.css'));

export class Timeline extends React.Component<TimelineProps, {}> {
    public render() {
        const {
            timelinePoints,
        } = this.props;

        return <div className={ 'Timeline' }>
            <div className={ 'Timeline__content' }>{ this.props.children }</div>
            {
                timelinePoints.map((timelinePointProps, key) => <TimelinePoint
                    key={ key }
                    { ...timelinePointProps }
                />)
            }
        </div>;
    }
}
