import * as React from 'react';
import { UnitScript } from '../../AnimationScript';
import { TimeLine } from '../../Constructor/Components/Timeline';
import { UnitTimelinePreviews } from '../../TimelinePreviews/UnitTimelinePreviews';
import { UnitName } from '../UNIT_NAMES';

export function createTimeLineForUnitScript<T extends UnitName>(unitScript: UnitScript<T>): React.ReactNode {
    const {
        unit,
        actions,
    } = unitScript;

    let durationSum = 0;
    const pointPositoins = actions.map(({ duration }) => {
        const position = durationSum;
        durationSum += duration;

        return position;
    });

    const TimelinePreviewClass = UnitTimelinePreviews[unit];

    return <TimeLine pointPositoins={ pointPositoins }>
        <TimelinePreviewClass unitScript={ unitScript }/>
    </TimeLine>;
}
