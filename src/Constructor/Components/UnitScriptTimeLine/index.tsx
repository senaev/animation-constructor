import * as React from 'react';
import { UnitScript } from '../../../AnimationScript';
import { UnitTimelinePreviews } from '../../../TimelinePreviews/UnitTimelinePreviews';
import { Unit } from '../../../Unit/Unit';
import { TimeLine } from '../TimeLine';

export type UnitScriptTimeLineProps<T extends Unit> = {
    unitScript: UnitScript<T>;
};

export class UnitScriptTimeLine<T extends Unit> extends React.Component<UnitScriptTimeLineProps<T>, {}> {
    public render() {
        const { unitScript } = this.props;

        const {
            unit,
            actions,
        } = unitScript;


        let durationSum = 0;
        const pointPositions = actions.map(({ duration }) => {
            const position = durationSum;
            durationSum += duration;

            return position;
        });

        const TimelinePreviewClass = UnitTimelinePreviews[unit];

        return <TimeLine pointPositoins={ pointPositions }>
            <TimelinePreviewClass unitScript={ unitScript }/>
        </TimeLine>;
    }
}