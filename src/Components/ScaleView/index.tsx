import * as React from 'react';
import { connect } from 'react-redux';
import { Scale } from '../../Scale/Scale';
import { scaleToStyles } from '../../Scale/utils/scaleToStyles';
import { ConstructorState } from '../../Store/State';
import { Square } from '../../utils/Trigonometry/Types/Square';
import { FillCentralSquare } from '../FillCentralSquare';
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
    private fillCentralSquare?: FillCentralSquare;

    public render() {
        const {
            scale,
        } = this.props;

        return <FillCentralSquare
            rel={ (fillCentralSquare) => {
                this.fillCentralSquare = fillCentralSquare;
            } }
            className={ c.ScaleView__fillCentralSquare }
        >
            <div
                className={ c.ScaleView__scaleDiv }
                style={ scaleToStyles(scale) }
            >
                { this.props.children }
            </div>
        </FillCentralSquare>;
    }

    public componentDidMount() {
        const { rel } = this.props;

        if (typeof rel === 'function') {
            rel(this);
        }
    }

    // public getSquareCoordinates(): PointCoordinates {
    //
    // }

    public getSquareState(): Square {
        const { fillCentralSquare } = this;

        if (!fillCentralSquare) {
            throw new Error('FillCentralSquare has not been initialized in ScaleView');
        }

        return fillCentralSquare.getState();
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
