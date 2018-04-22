import * as React from 'react';
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
    title: string;
    value: UnitTypes[T];
    onChangeValue: ((nextValue: UnitTypes[T]) => void) | undefined;
    onChangePosition: (nextPosition: number) => void;
    isChangeableDialogOpen: boolean;
    requestChangeableDialogOpened: (opened: boolean) => void;
};

export class TimeLinePointTooltip<T extends Unit> extends React.Component<TimeLinePointTooltipProps<T>, {}> {
    public render() {
        const {
            position,
            onRemove,
            movable,
            unit,
            title,
            value,
            onChangeValue,
            onChangePosition,
            isChangeableDialogOpen,
            requestChangeableDialogOpened,
        } = this.props;

        return <div className={ c.TimeLinePointTooltip }>
            {
                typeof onChangeValue === 'function'
                    ? <TimeLinePointChangable
                        unit={ unit }
                        title={ title }
                        value={ value }
                        onChange={ onChangeValue }
                        isDialogOpen={ isChangeableDialogOpen }
                        requestDialogOpened={ requestChangeableDialogOpened }
                    />
                    : null
            }
            <TimeLinePointEasing/>
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
