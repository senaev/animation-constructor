import * as React from 'react';
import { getValueByPosition } from '../../../Animation/util/getValueByPosition';
import { FieldsScripts } from '../../../AnimationScript/index';
import { getActionsParams } from '../../../AnimationScript/utils/getActionsParams';
import { ALL_FIELDS } from '../../../Fields/ALL_FIELDS';
import { FieldClass } from '../../../Fields/Field';
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
    isChangingActionPosition: boolean;
    onScriptActionPositionChangeStart: (actionPosition: ActionPosition<T>) => void;
    onScriptActionPositionChange: (actionPosition: ActionPosition<T>) => void;
    onScriptActionPositionChangeEnd: (actionPosition: ActionPosition<T>) => void;
};

export class FieldsTimeLines<T extends Record<string, Unit>> extends React.Component<FieldsTimeLinesProps<T>, {}> {
    public render() {
        const {
            fieldsScripts,
            titlesDictionary,
            containerWidth,
            isChangingActionPosition,
            onScriptActionPositionChangeStart,
            onScriptActionPositionChange,
            onScriptActionPositionChangeEnd,
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

                const value: any = getValueByPosition(position, unit, actions);
                const FieldClassX: FieldClass<any> = ALL_FIELDS[unit];

                return {
                    position,
                    movable,
                    tooltip: isChangingActionPosition
                        ? undefined
                        : <FieldClassX
                            value={ value }
                            onChange={ (v: any) => {
                                // console.log(value);
                            } }/>,
                    containerWidth,
                    onPositionChangeStart: (nextPosition: number) => {
                        onScriptActionPositionChangeStart({
                            fieldName,
                            actionIndex,
                            position: nextPosition,
                        });
                    },
                    onPositionChange: (nextPosition: number) => {
                        onScriptActionPositionChange({
                            fieldName,
                            actionIndex,
                            position: nextPosition,
                        });
                    },
                    onPositionChangeEnd: (nextPosition: number) => {
                        onScriptActionPositionChangeEnd({
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
