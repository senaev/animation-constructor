import * as React from 'react';
import { UnitScript } from '../../AnimationScript';
import { UnitTimelinePreviews } from '../../TimelinePreviews/UnitTimelinePreviews';
import { Unit } from '../../Unit/Unit';
import { TimeLine } from '../TimeLine';
import { TimeLinePointProps } from '../TimeLinePoint';

export type UnitScriptTimeLineProps<T extends Unit> = {
    unitScript: UnitScript<T>;
    points: TimeLinePointProps[];
};

export class UnitScriptTimeLine<T extends Unit> extends React.Component<UnitScriptTimeLineProps<T>, {}> {
    public render() {
        const {
            unitScript,
            points,
        } = this.props;

        const {
            unit,
        } = unitScript;

        const TimelinePreviewClass = UnitTimelinePreviews[unit];

        return <TimeLine points={ points }>
            <TimelinePreviewClass unitScript={ unitScript }/>
        </TimeLine>;
    }
}
