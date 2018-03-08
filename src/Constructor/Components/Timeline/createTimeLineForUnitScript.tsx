import * as React from 'react';
import { UnitScript } from '../../../AnimationScript';
import { UnitTimelinePreviews } from '../../../TimelinePreviews/UnitTimelinePreviews';
import { Unit } from '../../../Unit/Unit';
import { TimeLine } from './index';

export function createTimeLineForUnitScript<T extends Unit>(unitScript: UnitScript<T>): React.ReactNode {
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
