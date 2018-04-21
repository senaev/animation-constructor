import * as React from 'react';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { TimeLinePointMovableParams, } from '../TimeLinePoint';
import { TimeLinePointChangable } from '../TimeLinePointChangable';
import { TimeLinePointRemovable } from '../TimeLinePointRemovable';
import * as c from './index.pcss';

export type TimeLinePointTooltipProps<T extends Unit> = {
    position: number;
    onRemove: (() => void) | undefined;
    movable: TimeLinePointMovableParams | undefined;
    unit: T;
    title: string;
    value: UnitTypes[T];
    onChange: ((nextValue: UnitTypes[T]) => void) | undefined;
    isChangeableDialogOpen: boolean;
    requestChangeableDialogOpened: (opened: boolean) => void;
};

export class TimeLinePointTooltip<T extends Unit> extends React.Component<TimeLinePointTooltipProps<T>, {}> {
    public render() {
        const {
            onRemove,
            unit,
            title,
            value,
            onChange,
            isChangeableDialogOpen,
            requestChangeableDialogOpened,
        } = this.props;

        return <div className={ c.TimeLinePointTooltip }>
            {
                typeof onChange === 'function'
                    ? <TimeLinePointChangable
                        unit={ unit }
                        title={ title }
                        value={ value }
                        onChange={ onChange }
                        isDialogOpen={ isChangeableDialogOpen }
                        requestDialogOpened={ requestChangeableDialogOpened }
                    />
                    : null
            }
            {
                // TODO
                // movable === undefined
                //     ? null
                //     : <TimeLinePointMovable
                //         position={ position }
                //         movable={ movable }
                //     />
            }
            {
                typeof onRemove === 'function'
                    ? <TimeLinePointRemovable onRemove={ onRemove }/>
                    : null
            }
        </div>;
    }
}
