import { ActionDelete } from 'material-ui/svg-icons';
import * as React from 'react';

export type TimeLinePointRemovableProps = {
    onRemove: () => void;
};

export class TimeLinePointRemovable extends React.Component<TimeLinePointRemovableProps, {}> {
    public render() {

        return <div onClick={ this.props.onRemove }>
            <ActionDelete/>
        </div>;
    }
}
