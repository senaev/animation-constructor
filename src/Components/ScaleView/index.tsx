import * as React from 'react';
import { connect } from 'react-redux';
import { Scale } from '../../Scale/Scale';
import { scaleToStyles } from '../../Scale/utils/scaleToStyles';
import { ConstructorState } from '../../Store/State';
import { FillCentralSquare } from '../FillCentralSquare';
import * as c from './index.pcss';

export type ScaleViewOwnProps = {
    width: number;
    height: number;
};

export type ScaleViewProps =
    & {
        scale: Scale;
    }
    & ScaleViewOwnProps;

export class ScaleViewComponent extends React.Component<ScaleViewProps, {}> {
    public render() {
        const {
            width,
            height,
            scale,
        } = this.props;

        return <FillCentralSquare
            width={width}
            height={height}
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
}


const mapStateToProps = ({
                             scale,
                         }: ConstructorState,
                         {
                             width,
                             height,
                         }: ScaleViewOwnProps): ScaleViewProps => ({
    scale,
    width,
    height,
});

export const ScaleView = connect(mapStateToProps)(ScaleViewComponent);
