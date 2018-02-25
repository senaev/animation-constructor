import * as React from 'react';
import { addStylesToPage } from '../../../utils/addStylesToPage';
import { ResizeSensor } from '../../../utils/ResizeSensor';

export type FillSizeBlockProps = {
    relationX: number;
    relationY: number;
    additionalContainerStyles?: React.CSSProperties;
};

export type FillSizeBlockState = {
    width: string;
    height: string;
    relationX: number;
    relationY: number;
};

const defaultSize = '100%';

addStylesToPage(document, require('./index.css'));

export class FillSizeBlock extends React.Component<FillSizeBlockProps, FillSizeBlockState> {
    private container: HTMLElement | null;
    private element: HTMLElement | null;
    private resizeSensor: ResizeSensor | undefined;

    constructor(props: FillSizeBlockProps) {
        super(props);

        this.state = {
            width: defaultSize,
            height: defaultSize,
            relationX: props.relationX,
            relationY: props.relationY,
        };
    }

    public render() {
        const { width, height } = this.state;
        const { additionalContainerStyles } = this.props;

        return <div
            className={ 'FillSizeBlock' }
            ref={ (element) => {
                this.container = element;
            } }
            style={ additionalContainerStyles }
        >
            <div
                ref={ (element) => {
                    this.element = element;
                } }
                style={ {
                    position: 'absolute',
                    width,
                    height,
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

    private adaptSize = (): void => {
        if (this.resizeSensor && this.element) {
            const { height, width } = this.resizeSensor.getSize();

            const { relationX, relationY } = this.state;

            const calculatedWidth = width * relationY > height * relationX
                ? (height / relationY) * relationX
                : width;

            const calculatedHeight = (calculatedWidth / relationX) * relationY;

            this.setState({
                width: `${calculatedWidth}px`,
                height: `${calculatedHeight}px`,
            });
        }
    }
}
