import * as React from 'react';
import { TimeLinePoint, TimeLinePointProps } from '../TimeLinePoint';
import * as c from './index.pcss';

export type TimeLineProps = {
    points: TimeLinePointProps[];
};

export class TimeLine extends React.Component<TimeLineProps, {}> {
    constructor(props: TimeLineProps) {
        super(props);

        this.state = {
            isHovered: false,
            isDraggedCursor: false,
        };
    }

    public render() {
        const {
            points,
            children,
        } = this.props;

        return <div className={ c.TimeLine }>
            <div className={ c.TimeLine__content }>{ children }</div>
            {
                points.map((pointProps, i) => {
                    return <TimeLinePoint
                        key={ i }
                        { ...pointProps }
                    />;
                })
            }
        </div>;
    }
}
