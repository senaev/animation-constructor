import * as React from 'react';
import { connect } from 'react-redux';
import { Scale } from '../../Scale/Scale';
import { scaleToStyles } from '../../Scale/utils/scaleToStyles';
import { ConstructorState } from '../../Store/State';
import { FillSizeBlock } from '../FillSizeBlock';
import * as c from './index.pcss';

export type ScaleViewOwnProps = {
    rel?: (scaleView: ScaleViewComponent) => void;
};

export type ScaleViewProps =
    & {
        scale: Scale;
    }
    & ScaleViewOwnProps;

export class ScaleViewComponent extends React.Component<ScaleViewProps, {}> {
    private fillSizeBlock?: FillSizeBlock;

    public render() {
        const {
            scale,
        } = this.props;

        return <FillSizeBlock
            rel={ (fillSizeBlock) => {
                this.fillSizeBlock = fillSizeBlock;
            } }
            relationX={ 1 }
            relationY={ 1 }
            className={ c.ScaleView__fillSizeBlock }
        >
            <div
                className={ c.ScaleView__scaleDiv }
                style={ scaleToStyles(scale) }
            >
                { this.props.children }
            </div>
        </FillSizeBlock>;
    }

    public componentDidMount() {
        const { rel } = this.props;

        if (typeof rel === 'function') {
            rel(this);
        }
    }

    public getSquareSize(): number {
        const { fillSizeBlock } = this;

        if (!fillSizeBlock) {
            throw new Error('fillSizeBlock has not been initialized');
        }

        return fillSizeBlock.getSize().width;
    }
}


const mapStateToProps = ({
                             scale,
                         }: ConstructorState,
                         {
                             rel,
                         }: ScaleViewOwnProps): ScaleViewProps => ({
    scale,
    rel,
});

export const ScaleView = connect(mapStateToProps)(ScaleViewComponent);
