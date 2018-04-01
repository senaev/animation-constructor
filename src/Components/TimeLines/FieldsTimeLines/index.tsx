import * as React from 'react';
import { FieldsScripts } from '../../../AnimationScript';
import { getStepParams } from '../../../AnimationScript/utils/getStepParams';
import { AdditionalStep } from '../../../Store/types/AdditionalStep';
import { EditableStep } from '../../../Store/types/EditableStep';
import { EditableStepPosition } from '../../../Store/types/EditableStepPosition';
import { EditableStepValue } from '../../../Store/types/EditableStepValue';
import { UnitTimeLinePreviews } from '../../../TimelinePreviews/UnitTimeLinePreviews';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import * as c from '../index.pcss';
import { TimeLine } from '../TimeLine';
import { TimeLinePointProps } from '../TimeLinePoint';

export type FieldsTimeLinesProps<T extends Record<string, Unit>> = {
    fieldsScripts: FieldsScripts<T>;
    titlesDictionary: Record<keyof T, string>;
    containerWidth: UnitTypes[Unit.pixel];
    onScriptStepPositionChange: (stepPosition: EditableStepPosition<T>) => void;
    onScriptStepValueChange: (stepPosition: EditableStepValue<T>) => void;
    onScriptStepRemove: (stepPosition: EditableStep<T>) => void;
    onScriptStepAdd: (stepPosition: AdditionalStep<T>) => void;
};

export class FieldsTimeLines<T extends Record<string, Unit>> extends React.Component<FieldsTimeLinesProps<T>, {}> {
    public render() {
        const {
            fieldsScripts,
            titlesDictionary,
            containerWidth,
            onScriptStepPositionChange,
            onScriptStepValueChange,
            onScriptStepRemove,
            onScriptStepAdd,
        } = this.props;

        return getObjectKeys(fieldsScripts).map((fieldName, i) => {
            const title = titlesDictionary[fieldName];
            const unitScript = fieldsScripts[fieldName];

            const {
                unit,
                steps,
            } = unitScript;
            const pointPositions = getStepParams(steps);
            const points: TimeLinePointProps<Unit>[] = pointPositions.map(({
                                                                               previousStepPosition,
                                                                               position,
                                                                               nextStepPosition,
                                                                           }, stepIndex) => {
                let movable: TimeLinePointProps<Unit>['movable'];

                if (stepIndex > 0) {
                    if (previousStepPosition === undefined) {
                        throw new Error('PointParams without previousPosition value in not first point');
                    }

                    movable = {
                        min: previousStepPosition,
                        max: nextStepPosition === undefined
                            ? 1
                            : nextStepPosition,
                        onPositionChangeStart: (nextPosition: number) => {
                            this.setState({
                                changingPositionStep: {
                                    fieldName,
                                    stepIndex,
                                },
                            });
                        },
                        onPositionChange: (nextPosition: number) => {
                            onScriptStepPositionChange({
                                fieldName,
                                stepIndex,
                                position: nextPosition,
                            });
                        },
                        onPositionChangeEnd: (nextPosition: number) => {
                            this.setState({
                                changingPositionStep: undefined,
                            });
                        },
                    };
                }

                const { value } = steps[stepIndex];

                const point: TimeLinePointProps<Unit> = {
                    position,
                    movable,
                    removable: stepIndex > 0
                        ? {
                            onRemove: () => {
                                onScriptStepRemove({
                                    fieldName,
                                    stepIndex,
                                });
                            },
                        }
                        : undefined,
                    changeable: {
                        unit,
                        title,
                        value,
                        onChange: (nextValue) => {
                            onScriptStepValueChange({
                                fieldName,
                                stepIndex,
                                value: nextValue,
                            });
                        },
                    },
                    containerWidth,
                };

                return point;
            });

            const TimeLinePreviewClass = UnitTimeLinePreviews[unit];

            return <div
                key={ i }
                className={ c.TimeLines__row }
            >
                <span
                    title={ title }
                    className={ c.TimeLines__row__title }
                >
                    { title }
                </span>
                <div className={ c.TimeLines__row__timeline }>
                    <TimeLine points={ points }>
                        <TimeLinePreviewClass
                            size={ containerWidth }
                            unitScript={ unitScript }/>
                        <div
                            className={ c.TimeLines__row__timeline__clicker }
                            onClick={ (event) => {
                                const clickerElement = event.target as HTMLElement;
                                const {
                                    left,
                                    width,
                                } = clickerElement.getBoundingClientRect();

                                const position = (event.clientX - left) / width;

                                onScriptStepAdd({
                                    fieldName,
                                    position,
                                });
                            } }
                        />
                    </TimeLine>
                </div>
            </div>;
        });
    }
}
