import * as React from 'react';
import { Unit } from '../../../Unit/Unit';
import { TimeLinePointChangeableParams, TimeLinePointRemovableParams } from '../TimeLinePoint';
import { TimeLinePointChangable } from '../TimeLinePointChangable';
import { TimeLinePointRemovable } from '../TimeLinePointRemovable';
import * as c from './index.pcss';

export type TimeLinePointTooltipProps<T extends Unit> = {
    removable?: TimeLinePointRemovableParams;
    changeable?: TimeLinePointChangeableParams<T>;
    isChangeableDialogOpen: boolean;
    requestChangeableDialogOpened: (opened: boolean) => void;
};

export class TimeLinePointTooltip<T extends Unit> extends React.Component<TimeLinePointTooltipProps<T>, {}> {
    public render() {
        const {
            removable,
            changeable,
            isChangeableDialogOpen,
            requestChangeableDialogOpened,
        } = this.props;

        if (!changeable) {
            return null;
        }

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
                removable === undefined
                    ? null
                    : <TimeLinePointRemovable onRemove={ removable.onRemove }/>
            }
        </div>;
    }
}
