import * as React from 'react';
import { Unit } from '../../../Unit/Unit';
import {
    TimeLinePointChangeableParams,
    TimeLinePointMovableParams,
} from '../TimeLinePoint';
import { TimeLinePointChangable } from '../TimeLinePointChangable';
import { TimeLinePointRemovable } from '../TimeLinePointRemovable';
import * as c from './index.pcss';

export type TimeLinePointTooltipProps<T extends Unit> = {
    position: number;
    onRemove: (() => void) | undefined;
    movable: TimeLinePointMovableParams | undefined;
    changeable: TimeLinePointChangeableParams<T> | undefined;
    isChangeableDialogOpen: boolean;
    requestChangeableDialogOpened: (opened: boolean) => void;
};

export class TimeLinePointTooltip<T extends Unit> extends React.Component<TimeLinePointTooltipProps<T>, {}> {
    public render() {
        const {
            onRemove,
            changeable,
            isChangeableDialogOpen,
            requestChangeableDialogOpened,
        } = this.props;

        return <div className={ c.TimeLinePointTooltip }>
            {
                changeable === undefined
                    ? null
                    : <TimeLinePointChangable
                        unit={ changeable.unit }
                        title={ changeable.title }
                        value={ changeable.value }
                        onChange={ changeable.onChange }
                        isDialogOpen={ isChangeableDialogOpen }
                        requestDialogOpened={ requestChangeableDialogOpened }
                    />
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
