import * as React from 'react';
import { FieldsScripts } from '../../../AnimationScript';
import { getStepsParams } from '../../../AnimationScript/utils/getStepsParams';
import { BlockFieldUnits } from '../../../Block/BlockFieldUnits';
import { AdditionalStep } from '../../../Store/types/AdditionalStep';
import { EditableStepValue } from '../../../Store/types/EditableStepValue';
import { UnitTimeLinePreviews } from '../../../TimelinePreviews/UnitTimeLinePreviews';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import * as c from '../index.pcss';
import { TimeLine } from '../TimeLine';
import { TimeLinePointOwnProps } from '../TimeLinePoint/connected';

export type FieldsTimeLinesProps<T extends Record<string, Unit>> = {
    isBlockPositionField: T extends BlockFieldUnits ? true : false;
    fieldsScripts: FieldsScripts<T>;
    titlesDictionary: Record<keyof T, string>;
    containerWidth: UnitTypes[Unit.pixel];
    onScriptStepValueChange: (stepPosition: EditableStepValue<T>) => void;
    onScriptStepAdd: (stepPosition: AdditionalStep<T>) => void;
};

export class FieldsTimeLines<T extends Record<string, Unit>> extends React.Component<FieldsTimeLinesProps<T>, {}> {
    public render() {
        const {
            isBlockPositionField,
            fieldsScripts,
            titlesDictionary,
            containerWidth,
            onScriptStepValueChange,
            onScriptStepAdd,
        } = this.props;

        return getObjectKeys(fieldsScripts).map((fieldName, i) => {
            const title = titlesDictionary[fieldName];
            const unitScript = fieldsScripts[fieldName];

            const {
                unit,
                steps,
            } = unitScript;
            const pointStepsParams = getStepsParams(steps);
            const points: TimeLinePointOwnProps<T, T[typeof fieldName]>[] = pointStepsParams.map(({
                                                                                                      previousStepPosition,
                                                                                                      position,
                                                                                                      nextStepPosition,
                                                                                                  }, stepIndex) => {
                let movable: TimeLinePointOwnProps<T, T[typeof fieldName]>['movable'];

                if (stepIndex > 0) {
                    if (previousStepPosition === undefined) {
                        throw new Error('PointParams without previousPosition value in not first point');
                    }

                    movable = {
                        min: previousStepPosition,
                        max: nextStepPosition === undefined
                            ? 1
                            : nextStepPosition,
                    };
                }

                const { value } = steps[stepIndex];

                const point: TimeLinePointOwnProps<T, T[typeof fieldName]> = {
                    isBlockFieldStep: isBlockPositionField,
                    stepLocation: {
                        fieldName,
                        stepIndex,
                    },
                    movable,
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
