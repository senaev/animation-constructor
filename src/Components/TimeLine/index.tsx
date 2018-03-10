import * as React from 'react';
import { clamp } from '../../utils/clamp';
import { noop } from '../../utils/noop';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { TimeLinePoint } from '../TimeLinePoint';
import * as c from './index.pcss';

export type TimeLineMoveParams = {
    position: number;
    pointIndex: number;
};

export type TimeLineCallbacks = {
    onMovePointStart: (timeLineMoveParams: TimeLineMoveParams) => void;
    onMovePoint: (timeLineMoveParams: TimeLineMoveParams) => void;
    onMovePointEnd: (timeLineMoveParams: TimeLineMoveParams) => void;
};

export type PointParams = {
    position: number;
    movable: boolean;
};

export type TimeLineProps =
    & {
        points: PointParams[];
    }
    & Partial<TimeLineCallbacks>;

export class TimeLine extends React.Component<TimeLineProps, {}> {
    private resizeSensor?: ResizeSensor;

    private containerElement?: HTMLDivElement | null;
    private containerWidth?: number;
    private movePointStartPosition?: number;

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
            onMovePointStart = noop,
            onMovePoint = noop,
            onMovePointEnd = noop,
            children,
        } = this.props;

        return <div className={ c.TimeLine }
                    ref={ (element) => {
                        this.containerElement = element;
                    } }>
            <div className={ c.TimeLine__content }>{ children }</div>
            {
                points.map(({
                                position,
                                movable,
                            }, i) => {
                    return <TimeLinePoint
                        key={ i }
                        position={ position }
                        movable={ movable }
                        onPositionChangeStart={ () => {
                            const startPosition = this.props.points[i].position;

                            this.movePointStartPosition = startPosition;
                            onMovePointStart({
                                position: startPosition,
                                pointIndex: i,
                            });
                        } }
                        onPositionChange={ ({ relativeX }) => {
                            onMovePoint({
                                position: this.getPositionByPixelOffset(relativeX),
                                pointIndex: i,
                            });
                        } }
                        onPositionChangeEnd={ ({ relativeX }) => {
                            onMovePointEnd({
                                position: this.getPositionByPixelOffset(relativeX),
                                pointIndex: i,
                            });
                        } }
                    />;
                })
            }
        </div>;
    }

    public componentDidMount() {
        const { containerElement } = this;

        if (!containerElement) {
            throw new Error('Container element has not been initialized');
        }

        this.resizeSensor = new ResizeSensor(containerElement, ({ width }) => {
            this.containerWidth = width;
        });

        this.containerWidth = this.resizeSensor.getSize().width;
    }

    public componentWillUnmount() {
        const { resizeSensor } = this;

        if (!resizeSensor) {
            throw new Error('ResizeSensor has not been initialized');
        }

        resizeSensor.destroy();
    }

    private getPositionByPixelOffset(pixelOffset: number): number {
        const {
            movePointStartPosition,
            containerWidth,
        } = this;

        if (typeof movePointStartPosition !== 'number' || typeof containerWidth !== 'number') {
            throw new Error('One of properties is not defined');
        }

        return clamp(movePointStartPosition + pixelOffset / containerWidth, 0, 1);
    }
}
