import * as React from 'react';
import { getValueByPosition } from '../../Animation/util/getValueByPosition';
import { UnitScript } from '../../AnimationScript';
import { UnitTypes } from '../../Unit/UnitTypes';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { TimeLinePreviewProps } from '../UnitTimeLinePreviews';
import { COLOR_TIMELINE_HEIGHT } from './COLOR_TIMELINE_HEIGHT';
import * as c from './index.pcss';

export class ColorTimeLinePreview extends React.Component<TimeLinePreviewProps<'color'>> {
    private canvas?: HTMLCanvasElement | null;

    public render() {
        return <div
            className={ c.ColorTimeLinePreview }
            style={ { height: `${COLOR_TIMELINE_HEIGHT}px` } }
        >
            <canvas
                className={ c.ColorTimeLinePreview__canvas }
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
                                     }: TimeLinePreviewProps<'color'>) {
        this.redrawCanvas(size, unitScript);
    }

    private redrawCanvas(size: UnitTypes['pixel'], unitScript: UnitScript<'color'>) {
        const { canvas } = this;

        if (!canvas) {
            throw new Error('canvas element has not been initialized');
        }

        const {
            steps,
            unit,
        } = unitScript;

        if (steps.length === 0) {
            throw new Error('steps array cannot be zero-length');
        }

        const context = canvas.getContext('2d')!;

        const height = COLOR_TIMELINE_HEIGHT;

        canvas.width = size;
        canvas.height = height;

        context.clearRect(0, 0, size, height);

        for (let i = 0; i < size; i++) {
            const position = i / size;
            const value = getValueByPosition(position, unit, steps);
            context.fillStyle = colorToRGBAString(value);
            context.fillRect(i, 0, 1, height);
        }
    }
}
