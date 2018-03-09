import * as React from 'react';
import { clamp } from '../../../utils/clamp';
import { noop } from '../../../utils/noop';
import { ResizeSensor } from '../../../utils/ResizeSensor';
import { TimeLinePoint } from '../TimelinePoint';
import * as c from './index.pcss';

export type TimeLineCallbacks = {
    onMovePoint: (position: number, pointIndex: number) => void;
};

export type TimeLineProps =
    & {
        pointPositoins: number[];
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
            pointPositoins,
            onMovePoint = noop,
            children,
        } = this.props;

        return <div className={ c.TimeLine }
                    ref={ (element) => {
                        this.containerElement = element;
                    } }>
            <div className={ c.TimeLine__content }>{ children }</div>
            {
                pointPositoins.map((position, i) => {
                    return <TimeLinePoint
                        key={ i }
                        position={ position }
                        onPositionChangeStart={ () => {
                            this.movePointStartPosition = this.props.pointPositoins[i];
                        } }
                        onPositionChange={ (pixelOffset) => {
                            const {
                                movePointStartPosition,
                                containerWidth,
                            } = this;

                            if (typeof movePointStartPosition !== 'number' || typeof containerWidth !== 'number') {
                                throw new Error('One of properties is not defined');
                            }

                            const nextPosition = clamp(movePointStartPosition + pixelOffset / containerWidth, 0, 1);
                            onMovePoint(nextPosition, i);
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
}
