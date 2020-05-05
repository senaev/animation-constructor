import * as React from 'react';
import { FieldsScripts, UnitScript } from '../../../AnimationScript';
import { getStepsParams } from '../../../AnimationScript/utils/getStepsParams';
import { BlockFieldUnits } from '../../../Block/BlockFieldUnits';
import { AdditionalStep } from '../../../Store/types/AdditionalStep';
import { getUnitTimeLinePreviewClass } from '../../../TimelinePreviews/UnitTimeLinePreviews';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import * as c from '../index.pcss';
import { TimeLinePointConnected } from '../TimeLinePoint/connected';

export type FieldsTimeLinesProps<T extends Record<string, Unit>> = {
    isBlockField: T extends BlockFieldUnits ? true : false;
    fieldsScripts: FieldsScripts<T>;
    titlesDictionary: Record<keyof T, string>;
    containerWidth: UnitTypes['pixel'];
    onScriptStepAdd: (stepPosition: AdditionalStep<T>) => void;
};

export function FieldTimeLine<T extends Unit> ({
                                                   fieldName,
                                                   title,
                                                   unitScript,
                                                   containerWidth,
                                                   onScriptStepAdd,
                                                   isBlockField,
                                               }: {
    fieldName: string;
    title: string;
    unitScript: UnitScript<T>;
    containerWidth: UnitTypes['pixel'];
    onScriptStepAdd: (position: number) => void;
    isBlockField: boolean;
}) {
    const {
        unit,
        steps,
    } = unitScript;
    const pointStepsParams = getStepsParams(steps);

    const TimeLinePreviewClass = getUnitTimeLinePreviewClass(unit);

    return <div
        className={ c.TimeLines__row }
    >
                <span
                    title={ title }
                    className={ c.TimeLines__row__title }
                >
                    { title }
                </span>
        <div className={ c.TimeLines__row__timeline }>
            <div className={ c.TimeLines__row__timeline__container }>
                <div className={ c.TimeLines__row__timeline__container__content }>
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

                            onScriptStepAdd(position);
                        } }
                    />
                </div>
                {
                    pointStepsParams.map(({ position }, stepIndex) => {
                        return <TimeLinePointConnected
                            key={ stepIndex }
                            isBlockFieldStep={ isBlockField }
                            stepLocation={ {
                                fieldName,
                                stepIndex,
                            } }
                            containerWidth={ containerWidth }
                        />;
                    })
                }
            </div>
        </div>
    </div>;
}

export class FieldsTimeLines<T extends Record<string, Unit>> extends React.Component<FieldsTimeLinesProps<T>, {}> {
    public render () {
        const {
            isBlockField,
            fieldsScripts,
            titlesDictionary,
            containerWidth,
            onScriptStepAdd,
        } = this.props;

        return getObjectKeys(fieldsScripts).map((fieldName, fieldIndex) => {
            const title = titlesDictionary[fieldName];
            const unitScript = fieldsScripts[fieldName];

            return <FieldTimeLine
                fieldName={fieldName}
                title={title}
                unitScript={unitScript}
                containerWidth={containerWidth}
                onScriptStepAdd={(position) => {
                    onScriptStepAdd({
                        fieldName,
                        position,
                    });
                } }
                isBlockField={isBlockField}
            />;
        });
    }
}
