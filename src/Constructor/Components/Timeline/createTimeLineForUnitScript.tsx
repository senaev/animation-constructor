import * as React from 'react';
import { UnitScript } from '../../../AnimationScript/index';
import { UnitTimelinePreviews } from '../../../TimelinePreviews/UnitTimelinePreviews';
import { UnitName } from '../../../Unit/UNIT_NAMES';
import { TimeLine } from './index';

export function createTimeLineForUnitScript<T extends UnitName>(unitScript: UnitScript<T>): React.ReactNode {
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
