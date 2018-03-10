import * as React from 'react';
import { UnitScript } from '../../AnimationScript';
import { getActionsParams } from '../../AnimationScript/utils/getActionsParams';
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

        const pointPositions = getActionsParams(actions);

        const TimelinePreviewClass = UnitTimelinePreviews[unit];

        const points: PointParams[] = pointPositions.map(({
                                                              previousPosition,
                                                              position,
                                                              nextPosition,
                                                          }, i) => {
            if (i === 0) {
                return {
                    position,
                    movable: undefined,
                };
            } else {
                if (previousPosition === undefined) {
                    throw new Error('PointParams without previousPosition value in not first point');
                }

                return {
                    position,
                    movable: {
                        min: previousPosition,
                        max: nextPosition === undefined
                            ? 1
                            : nextPosition,
                    },
                };
            }
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
