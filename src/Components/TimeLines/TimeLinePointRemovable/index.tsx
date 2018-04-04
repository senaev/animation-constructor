import { ActionDelete } from 'material-ui/svg-icons';
import * as React from 'react';
import { TimeLinePointRemovableParams } from '../TimeLinePoint/index';

export class TimeLinePointRemovable extends React.Component<TimeLinePointRemovableParams, {}> {
    public render() {

        return <div onClick={ this.props.onRemove }>
            <ActionDelete/>
        </div>;
    }
}
