import * as React from 'react';
import { Easing } from '../../../Easing/Easing';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { TimeLinePointMovableParams, } from '../TimeLinePoint';
import { TimeLinePointChangable } from '../TimeLinePointChangable';
import { TimeLinePointEasing } from '../TimeLinePointEasing';
import { TimeLinePointMovable } from '../TimeLinePointMovable/TimeLinePointMovable';
import { TimeLinePointRemovable } from '../TimeLinePointRemovable';
import * as c from './index.pcss';

export type TimeLinePointTooltipProps<T extends Unit> = {
    position: number;
    onRemove: (() => void) | undefined;
    movable: TimeLinePointMovableParams | undefined;
    unit: T;
    value: UnitTypes[T];
    onChangeValue: ((nextValue: UnitTypes[T]) => void) | undefined;
    onChangePosition: (nextPosition: number) => void;
    requestChangeableDialogOpened: (opened: boolean) => void;
    easing: Easing | undefined;
    onChangeEasing: (easing: Easing | undefined) => void;
};

export class TimeLinePointTooltip<T extends Unit> extends React.Component<TimeLinePointTooltipProps<T>, {}> {
    public render() {
        const {
            position,
            onRemove,
            movable,
            unit,
            value,
            onChangeValue,
            onChangePosition,
            requestChangeableDialogOpened,
            easing,
            onChangeEasing,
        } = this.props;

        return <div className={ c.TimeLinePointTooltip }>
            {
                typeof onChangeValue === 'function'
                    ? <TimeLinePointChangable
                        unit={ unit }
                        value={ value }
                        onChange={ onChangeValue }
                        requestDialogOpened={ requestChangeableDialogOpened }
                    />
                    : null
            }
            <TimeLinePointEasing
                easing={ easing }
                onChange={ onChangeEasing }
            />
            {
                movable === undefined
                    ? null
                    : <TimeLinePointMovable
                        position={ position }
                        movable={ movable }
                        onChange={ onChangePosition }
                    />
            }
            {
                typeof onRemove === 'function'
                    ? <TimeLinePointRemovable onRemove={ onRemove }/>
                    : null
            }
        </div>;
    }
}
