import * as React from 'react';
import { getValueByPosition } from '../../Animation/util/getValueByPosition';
import { Unit } from '../../Unit/Unit';
import { UnitShortTitles } from '../../Unit/UnitShortTitles';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { TimelitePreviewProps } from '../UnitTimelinePreviews';
import * as c from './index.pcss';
import { NUMBER_TIMELINE_HEIGHT } from './NUMBER_TIMELINE_HEIGHT';

const unit = Unit.percent;

export class NumberTimelinePreview extends React.Component<TimelitePreviewProps<Unit.percent>> {
    private resizeSensor: ResizeSensor;
    private containerElement: HTMLDivElement;

    private canvas: HTMLCanvasElement;

    public render() {
        return <div
            className={ c.NumberTimelinePreview }
            ref={ (element) => {
                this.containerElement = element!;
            } }
        >
            <canvas
                className={ c.NumberTimelinePreview__canvas }
                style={ { height: `${NUMBER_TIMELINE_HEIGHT}px` } }
                ref={ (element) => {
                    this.canvas = element!;
                } }
            />
        </div>;
    }

    public componentDidMount() {
        this.resizeSensor = new ResizeSensor(this.containerElement, () => {
            this.redrawCanvas();
        });

        this.redrawCanvas();
    }

    public componentWillReceiveProps() {
        this.redrawCanvas();
    }

    public componentWillUnmount() {
        this.resizeSensor.destroy();
    }

    private redrawCanvas() {
        const { canvas } = this;
        const { actions } = this.props;

        if (actions.length === 0) {
            throw new Error('actions array cannot be zero-length');
        }

        const context = canvas.getContext('2d')!;

        const width = canvas.getBoundingClientRect().width;
        const height = NUMBER_TIMELINE_HEIGHT;

        canvas.width = width;
        canvas.height = height;

        context.clearRect(0, 0, width, height);

        const values = actions.map(({ value }) => value);

        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const hasNoAnimations = maxValue === minValue;

        const dif = hasNoAnimations
            ? 1
            : maxValue - minValue;

        const canvasValues = actions.map((action) => {
            return {
                ...action,
                value: (1 - ((action.value - minValue) / dif)) * NUMBER_TIMELINE_HEIGHT,
            };
        });

        context.fillStyle = 'rgba(0,255,232, 0.1)';
        context.fillRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(0, canvasValues[0].value);

        for (let i = 0; i < width; i++) {
            const position = i / width;
            const value = getValueByPosition(position, unit, canvasValues);
            // console.log(i, value);
            context.lineTo(i, value);
        }
        context.strokeStyle = '#2f4e5f';
        context.stroke();


        context.font = '10px';
        context.fillStyle = 'rgba(255, 0, 0, 0.7)';
        context.fillText(`${maxValue}${UnitShortTitles[unit]}`, 1, 10);
        if (!hasNoAnimations) {
            context.fillText(`${minValue}${UnitShortTitles[unit]}`, 1, 50);
        }
    }
}
