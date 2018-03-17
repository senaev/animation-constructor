import * as React from 'react';
import { connect } from 'react-redux';
import { scaleToStyles } from '../../Scale/utils/scaleToStyles';
import { ConstructorState } from '../../Store/State';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { FillCentralSquare } from '../FillCentralSquare';
import * as c from './index.pcss';

export type ScaleViewOwnProps = {
    width: number;
    height: number;
};

export type ScaleViewProps =
    & {
        scaleCoordinates: PointCoordinates;
        zoom: number;
        relation: Size;
    }
    & ScaleViewOwnProps;

export class ScaleViewComponent extends React.Component<ScaleViewProps, {}> {
    public render() {
        const {
            scaleCoordinates,
            zoom,
            relation,
            width,
            height,
        } = this.props;

        return <FillCentralSquare
            width={ width }
            height={ height }
            className={ c.ScaleView__fillCentralSquare }
        >
            <div
                className={ c.ScaleView__scaleDiv }
                style={ scaleToStyles(scaleCoordinates, zoom, relation) }
            >
                { this.props.children }
            </div>
        </FillCentralSquare>;
    }
}


const mapStateToProps = ({
                             scaleCoordinates,
                             zoom,
                             relation,
                         }: ConstructorState,
                         {
                             width,
                             height,
                         }: ScaleViewOwnProps): ScaleViewProps => ({
    scaleCoordinates,
    zoom,
    relation,
    width,
    height,
});

export const ScaleView = connect(mapStateToProps)(ScaleViewComponent);
