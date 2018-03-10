import * as React from 'react';
import { UnitScript } from '../../AnimationScript';
import { getActionsPositions } from '../../AnimationScript/utils/getActionsPositions';
import { UnitTimelinePreviews } from '../../TimelinePreviews/UnitTimelinePreviews';
import { Unit } from '../../Unit/Unit';
import { PointParams, TimeLine, TimeLineCallbacks } from '../TimeLine';

export type UnitScriptTimeLineProps<T extends Unit> =
    & {
        unitScript: UnitScript<T>;
    }
    & Partial<TimeLineCallbacks>;

export class UnitScriptTimeLine<T extends Unit> extends React.Component<UnitScriptTimeLineProps<T>, {}> {
    public render() {
        const {
            unitScript,
            onMovePointStart,
            onMovePoint,
            onMovePointEnd,
        } = this.props;

        const {
            unit,
            actions,
        } = unitScript;

        const pointPositions = getActionsPositions(actions);

        const TimelinePreviewClass = UnitTimelinePreviews[unit];

        const points: PointParams[] = pointPositions.map((position, i) => {
            return {
                position,
                movable: i !== 0,
            };
        });

        return <TimeLine
            points={ points }
            onMovePointStart={ onMovePointStart }
            onMovePoint={ onMovePoint }
            onMovePointEnd={ onMovePointEnd }
        >
            <TimelinePreviewClass unitScript={ unitScript }/>
        </TimeLine>;
    }
}
