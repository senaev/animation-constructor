import * as React from 'react';
import { FieldsScripts } from '../../AnimationScript';
import { getActionsParams } from '../../AnimationScript/utils/getActionsParams';
import { ActionPosition } from '../../Store/types/ActionPosition';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { getObjectKeys } from '../../utils/getObjectKeys';
import * as c from '../AnimationTimeLines/index.pcss';
import { TimeLinePointProps } from '../TimeLinePoint';
import { UnitScriptTimeLine } from '../UnitScriptTimeLine';

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

                const point: TimeLinePointProps = {
                    position,
                    movable,
                    containerWidth,
                    onPositionChange: (nextPosition) => {
                        onScriptActionPositionChange({
                            fieldName,
                            actionIndex,
                            position: nextPosition,
                        });
                    },
                };

                return point;
            });

            return <div
                key={ i }
                className={ c.AnimationTimelines__TimeLine__padding }
            >
                <div className={ c.AnimationTimelines__TimeLine__title }>{ title }</div>
                <UnitScriptTimeLine
                    points={ points }
                    unitScript={ unitScript }
                />
            </div>;
        });
    }
}
