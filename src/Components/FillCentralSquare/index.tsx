import * as cx from 'classnames';
import * as React from 'react';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { getCentralSquareOfRectangle } from '../../utils/Trigonometry/getCentralSquareOfRectangle';
import { Square } from '../../utils/Trigonometry/Types/Square';
import * as c from './index.pcss';

export type FillCentralSquareProps = {
    className?: string;
    rel?: (fillCentralSquare: FillCentralSquare) => void;
};

export const DEFAULT_SQUARE: Square = {
    size: 100,
    x: 0,
    y: 0,
};

export class FillCentralSquare extends React.Component<FillCentralSquareProps, Square> {
    private container?: HTMLElement | null;
    private resizeSensor: ResizeSensor | undefined;

    constructor(props: FillCentralSquareProps) {
        super(props);

        this.state = DEFAULT_SQUARE;
    }

    public render() {
        const {
            size,
            x,
            y,
        } = this.state;
        const { className } = this.props;

        return <div
            className={ cx(c.FillCentralSquare, className) }
            ref={ (element) => {
                this.container = element;
            } }
        >
            <div
                style={ {
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${x}px`,
                    top: `${y}px`,
                } }
            >
                { this.props.children }
            </div>
        </div>;
    }

    public componentDidMount() {
        const {
            container,
        } = this;

        if (!container) {
            throw new Error('One of FillCentralSquare properties has not been initialized');
        }

        this.resizeSensor = new ResizeSensor(container, this.adaptSize);
        this.adaptSize();

        const { rel } = this.props;

        if (typeof rel === 'function') {
            rel(this);
        }
    }

    public getState(): Square {
        return this.state;
    }

    private adaptSize = (): void => {
        const {
            resizeSensor,
        } = this;

        if (!resizeSensor) {
            throw new Error('One of FillCentrtalSquare properties has not been inititlized');
        }

        const { height, width } = resizeSensor.getSize();

        this.setState(getCentralSquareOfRectangle(width, height));
    }
}
