import * as React from 'react';
import { getValueByPosition } from '../../Animation/util/getValueByPosition';
import { UnitScript } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { UnitShortTitles } from '../../Unit/UnitShortTitles';
import { UnitTypes } from '../../Unit/UnitTypes';
import { TimeLinePreviewProps } from '../UnitTimeLinePreviews';
import * as c from './index.pcss';
import { NUMBER_TIMELINE_FONT_SIZE } from './NUMBER_TIMELINE_FONT_SIZE';
import { NUMBER_TIMELINE_HEIGHT } from './NUMBER_TIMELINE_HEIGHT';
import { NUMBER_TIMELINE_PADDING } from './NUMBER_TIMELINE_PADDING';

type UNIT = Unit.percent | Unit.pixel | Unit.degree;

export class NumberTimeLinePreview extends React.Component<TimeLinePreviewProps<UNIT>> {
    private canvas?: HTMLCanvasElement | null;

    public render() {
        return <div
            className={ c.NumberTimeLinePreview }
            style={ { height: `${NUMBER_TIMELINE_HEIGHT}px` } }
        >
            <canvas
                className={ c.NumberTimeLinePreview__canvas }
                ref={ (element) => {
                    this.canvas = element;
                } }
            />
        </div>;
    }

    public componentDidMount() {
        const {
            size,
            unitScript,
        } = this.props;
        this.redrawCanvas(size, unitScript);
    }

    public componentWillReceiveProps({
                                         size,
                                         unitScript,
                                     }: TimeLinePreviewProps<UNIT>) {
        this.redrawCanvas(size, unitScript);
    }

    private redrawCanvas(size: UnitTypes[Unit.pixel], unitScript: UnitScript<UNIT>) {
        const { canvas } = this;

        if (!canvas) {
            throw new Error('Canvas element has not been initialized');
        }

        const {
            steps,
            unit,
        } = unitScript;

        if (steps.length === 0) {
            throw new Error('steps array cannot be zero-length');
        }

        const context = canvas.getContext('2d')!;
        const height = NUMBER_TIMELINE_HEIGHT;

        canvas.width = size;
        canvas.height = height;

        context.clearRect(0, 0, size, height);

        const values = steps.map(({ value }) => value);

        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const hasNoAnimations = maxValue === minValue;

        const dif = hasNoAnimations
            ? 1
            : maxValue - minValue;

        const canvasValues = steps.map((step) => {
            const relativeValue = (1 - ((step.value - minValue) / dif));

            return {
                ...step,
                value: relativeValue * (NUMBER_TIMELINE_HEIGHT - NUMBER_TIMELINE_PADDING * 2) + NUMBER_TIMELINE_PADDING,
            };
        });

        context.fillStyle = 'rgba(0, 0, 0, 0)';
        context.fillRect(0, 0, size, height);

        context.beginPath();
        context.moveTo(0, canvasValues[0].value);

        for (let i = 0; i < size; i++) {
            const position = i / size;
            const value = getValueByPosition(position, unit, canvasValues);
            context.lineTo(i, value);
        }
        context.strokeStyle = '#2f4e5f';
        context.stroke();

        context.font = `${NUMBER_TIMELINE_FONT_SIZE}px`;
        context.fillStyle = 'rgba(255, 0, 0, 0.7)';
        context.fillText(`${maxValue}${UnitShortTitles[unit]}`, 1, NUMBER_TIMELINE_FONT_SIZE);
        if (!hasNoAnimations) {
            context.fillText(`${minValue}${UnitShortTitles[unit]}`, 1, NUMBER_TIMELINE_HEIGHT);
        }
    }
}
