import * as cx from 'classnames';
import * as React from 'react';
import { Size } from '../../types/Size';
import { ResizeSensor } from '../../utils/ResizeSensor';
import * as c from './index.pcss';

export type FillSizeBlockProps = {
    relationX: number;
    relationY: number;
    className?: string;
    rel?: (fillSizeBlock: FillSizeBlock) => void;
};

export type FillSizeBlockState = {
    width: number;
    height: number;
    relationX: number;
    relationY: number;
};

const DEFAULT_SIZE = 100;

// TODO: fillSquareBlock maybe?
export class FillSizeBlock extends React.Component<FillSizeBlockProps, FillSizeBlockState> {
    private container?: HTMLElement | null;
    private element?: HTMLElement | null;
    private resizeSensor: ResizeSensor | undefined;

    constructor(props: FillSizeBlockProps) {
        super(props);

        this.state = {
            width: DEFAULT_SIZE,
            height: DEFAULT_SIZE,
            relationX: props.relationX,
            relationY: props.relationY,
        };
    }

    public render() {
        const {
            width,
            height,
        } = this.state;
        const { className } = this.props;

        return <div
            className={ cx(c.FillSizeBlock, className) }
            ref={ (element) => {
                this.container = element;
            } }
        >
            <div
                ref={ (element) => {
                    this.element = element;
                } }
                style={ {
                    position: 'absolute',
                    width: `${width}px`,
                    height: `${height}px`,
                } }
            >
                { this.props.children }
            </div>
        </div>;
    }

    public componentDidMount() {
        if (this.container) {
            this.resizeSensor = new ResizeSensor(this.container, this.adaptSize);
            this.adaptSize();
        }

        const { rel } = this.props;

        if (typeof rel === 'function') {
            rel(this);
        }
    }


    public componentWillReceiveProps({
                                         relationX,
                                         relationY,
                                     }: FillSizeBlockProps) {
        this.setState({
            relationX,
            relationY,
        }, this.adaptSize);
    }

    public getSize(): Size {
        const {
            width,
            height,
        } = this.state;

        return {
            width,
            height,
        };
    }

    private adaptSize = (): void => {
        if (this.resizeSensor && this.element) {
            const { height, width } = this.resizeSensor.getSize();

            const { relationX, relationY } = this.state;

            const calculatedWidth = width * relationY > height * relationX
                ? (height / relationY) * relationX
                : width;

            const calculatedHeight = (calculatedWidth / relationX) * relationY;

            this.setState({
                width: calculatedWidth,
                height: calculatedHeight,
            });
        }
    }
}
