import * as React from 'react';
import * as c from './index.pcss';


export class TimeLinePointTooltip extends React.Component<{}, {}> {
    public render() {
        return <div className={ c.TimeLinePointTooltip }>{
            this.props.children
        }</div>;
    }
}
