import * as React from 'react';
import { getValueByPosition } from '../../Animation/util/getValueByPosition';
import { Unit } from '../../Unit/Unit';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { TimelitePreviewProps } from '../UnitTimelinePreviews';
import { COLOR_TIMELINE_HEIGHT } from './COLOR_TIMELINE_HEIGHT';
import * as c from './index.pcss';

export class ColorTimeLinePreview extends React.Component<TimelitePreviewProps<Unit.color>> {
    private resizeSensor: ResizeSensor;
    private containerElement: HTMLDivElement;

    private canvas: HTMLCanvasElement;

    public render() {
        return <div
            className={ c.ColorTimeLinePreview }
            style={ { height: `${COLOR_TIMELINE_HEIGHT}px` } }
            ref={ (element) => {
                this.containerElement = element!;
            } }
        >
            <canvas
                className={ c.ColorTimeLinePreview__canvas }
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
        const {
            actions,
            unit,
        } = this.props.unitScript;

        if (actions.length === 0) {
            throw new Error('actions array cannot be zero-length');
        }

        const context = canvas.getContext('2d')!;

        const width = canvas.getBoundingClientRect().width;
        const height = COLOR_TIMELINE_HEIGHT;

        canvas.width = width;
        canvas.height = height;

        context.clearRect(0, 0, width, height);

        for (let i = 0; i < width; i++) {
            const position = i / width;
            const value = getValueByPosition(position, unit, actions);
            context.fillStyle = colorToRGBAString(value);

            console.log(colorToRGBAString(value));

            context.fillRect(i, 0, 1, height);
        }
    }
}
