import * as React from 'react';
import { FieldsScripts } from '../../../AnimationScript';
import { getActionsParams } from '../../../AnimationScript/utils/getActionsParams';
import { AddedAction } from '../../../Store/types/AddedAction';
import { ChangedAction } from '../../../Store/types/ChangedAction';
import { ChangedActionPosition } from '../../../Store/types/ChangedActionPosition';
import { ChangedActionValue } from '../../../Store/types/ChangedActionValue';
import { UnitTimelinePreviews } from '../../../TimelinePreviews/UnitTimelinePreviews';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import { TimeLine } from '../TimeLine';
import { TimeLinePointProps } from '../TimeLinePoint';
import * as c from './index.pcss';

export type FieldsTimeLinesProps<T extends Record<string, Unit>> = {
    fieldsScripts: FieldsScripts<T>;
    titlesDictionary: Record<keyof T, string>;
    containerWidth: UnitTypes[Unit.pixel];
    isChangingActionPosition: boolean;
    onScriptActionPositionChangeStart: (actionPosition: ChangedActionPosition<T>) => void;
    onScriptActionPositionChange: (actionPosition: ChangedActionPosition<T>) => void;
    onScriptActionPositionChangeEnd: (actionPosition: ChangedActionPosition<T>) => void;
    onScriptActionValueChange: (actionValue: ChangedActionValue<T>) => void;
    onScriptActionRemove: (actionValue: ChangedAction<T>) => void;
    onScriptActionAdd: (actionValue: AddedAction<T>) => void;
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
            onScriptActionValueChange,
            onScriptActionRemove,
            onScriptActionAdd,
        } = this.props;

        return getObjectKeys(fieldsScripts).map((fieldName, i) => {
            const title = titlesDictionary[fieldName];
            const unitScript = fieldsScripts[fieldName];

            const {
                unit,
                actions,
            } = unitScript;
            const pointPositions = getActionsParams(actions);
            const points: TimeLinePointProps<Unit>[] = pointPositions.map(({
                                                                               previousActionPosition,
                                                                               position,
                                                                               nextActionPosition,
                                                                           }, actionIndex) => {
                let movable: TimeLinePointProps<Unit>['movable'];

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

                const { value } = actions[actionIndex];

                const point: TimeLinePointProps<Unit> = {
                    position,
                    movable,
                    removable: actionIndex > 0
                        ? {
                            onRemove: () => {
                                onScriptActionRemove({
                                    fieldName,
                                    actionIndex,
                                });
                            },
                        }
                        : undefined,
                    changeable: isChangingActionPosition
                        ? undefined
                        : {
                            unit,
                            title,
                            value,
                            onChange: (nextValue) => {
                                onScriptActionValueChange({
                                    fieldName,
                                    actionIndex,
                                    value: nextValue,
                                });
                            },
                        },
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

                return point;
            });

            const TimeLinePreviewClass = UnitTimelinePreviews[unit];

            return <div
                key={ i }
                className={ c.FieldsTimeLines }
            >
                <div className={ c.FieldsTimeLines__title }>{ title }</div>
                <TimeLine points={ points }>
                    <TimeLinePreviewClass unitScript={ unitScript }/>
                    <div
                        className={ c.FieldsTimeLines__clicker }
                        onClick={ (event) => {
                            const clickerElement = event.target as HTMLElement;
                            const {
                                left,
                                width,
                            } = clickerElement.getBoundingClientRect();

                            const position = (event.clientX - left) / width;

                            onScriptActionAdd({
                                fieldName,
                                position,
                            });
                        } }
                    />
                </TimeLine>
            </div>;
        });
    }
}
