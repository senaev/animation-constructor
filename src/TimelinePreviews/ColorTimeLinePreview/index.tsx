import * as React from 'react';
import { getValueByPosition } from '../../Animation/util/getValueByPosition';
import { UnitScript } from '../../AnimationScript';
import { Unit } from '../../Unit/Unit';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { TimeLinePreviewProps } from '../UnitTimeLinePreviews';
import { COLOR_TIMELINE_HEIGHT } from './COLOR_TIMELINE_HEIGHT';
import * as c from './index.pcss';

export class ColorTimeLinePreview extends React.Component<TimeLinePreviewProps<Unit.color>> {
    private resizeSensor?: ResizeSensor;
    private containerElement?: HTMLDivElement | null;

    private canvas?: HTMLCanvasElement | null;

    public render() {
        return <div
            className={ c.ColorTimeLinePreview }
            style={ { height: `${COLOR_TIMELINE_HEIGHT}px` } }
            ref={ (element) => {
                this.containerElement = element;
            } }
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
        const { containerElement } = this;

        if (!containerElement) {
            throw new Error('Container element has not been initialized');
        }

        this.resizeSensor = new ResizeSensor(containerElement, () => {
            this.redrawCanvas(this.props.unitScript);
        });

        this.redrawCanvas(this.props.unitScript);
    }

    public componentWillReceiveProps({ unitScript }: TimeLinePreviewProps<Unit.color>) {
        this.redrawCanvas(unitScript);
    }

    public componentWillUnmount() {
        const { resizeSensor } = this;

        if (!resizeSensor) {
            throw new Error('ResizeSensor has not been initialized');
        }

        resizeSensor.destroy();
    }

    private redrawCanvas(unitScript: UnitScript<Unit.color>) {
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

        const width = canvas.getBoundingClientRect().width;
        const height = COLOR_TIMELINE_HEIGHT;

        canvas.width = width;
        canvas.height = height;

        context.clearRect(0, 0, width, height);

        for (let i = 0; i < width; i++) {
            const position = i / width;
            const value = getValueByPosition(position, unit, steps);
            context.fillStyle = colorToRGBAString(value);
            context.fillRect(i, 0, 1, height);
        }
    }
}
