import * as React from 'react';
import { FieldsScripts } from '../../../AnimationScript/index';
import { getActionsParams } from '../../../AnimationScript/utils/getActionsParams';
import { ActionPosition } from '../../../Store/types/ActionPosition';
import { UnitTimelinePreviews } from '../../../TimelinePreviews/UnitTimelinePreviews';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { getObjectKeys } from '../../../utils/getObjectKeys/index';
import * as c from '../index.pcss';
import { TimeLine } from '../TimeLine/index';
import { TimeLinePointProps } from '../TimeLinePoint/index';

export type FieldsTimeLinesProps<T extends Record<string, Unit>> = {
    fieldsScripts: FieldsScripts<T>;
    titlesDictionary: Record<keyof T, string>;
    containerWidth: UnitTypes[Unit.pixel];
    onScriptActionPositionChange: (actionPosition: ActionPosition<T>) => void;
};

export class FieldsTimeLines<T extends Record<string, Unit>> extends React.Component<FieldsTimeLinesProps<T>, {}> {
    public render() {
        const {
            fieldsScripts,
            titlesDictionary,
            containerWidth,
            onScriptActionPositionChange,
        } = this.props;

        return getObjectKeys(fieldsScripts).map((fieldName, i) => {
            const title = titlesDictionary[fieldName];
            const unitScript = fieldsScripts[fieldName];

            const {
                unit,
                actions,
            } = unitScript;
            const pointPositions = getActionsParams(actions);
            const points: TimeLinePointProps[] = pointPositions.map(({
                                                                         previousActionPosition,
                                                                         position,
                                                                         nextActionPosition,
                                                                     }, actionIndex) => {
                let movable: TimeLinePointProps['movable'];

                if (actionIndex > 0) {
                    if (previousActionPosition === undefined) {
                        throw new Error('PointParams without previousPosition value in not first point');
                    }

                    movable = {
                        min: previousActionPosition,
                        max: nextActionPosition === undefined
                            ? 1
                            : nextActionPosition,
                    };
                }

                return {
                    position,
                    movable,
                    containerWidth,
                    onPositionChange: (nextPosition: number) => {
                        onScriptActionPositionChange({
                            fieldName,
                            actionIndex,
                            position: nextPosition,
                        });
                    },
                };
            });

            const TimeLinePreviewClass = UnitTimelinePreviews[unit];

            return <div
                key={ i }
                className={ c.AnimationTimelines__TimeLine__padding }
            >
                <div className={ c.AnimationTimelines__TimeLine__title }>{ title }</div>
                <TimeLine points={ points }>
                    <TimeLinePreviewClass unitScript={ unitScript }/>
                </TimeLine>
            </div>;
        });
    }
}
