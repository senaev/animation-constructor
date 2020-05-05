import * as React from 'react';
import { connect } from 'react-redux';
import { getRectangleByScale } from '../../Scale/utils/getRectangleByScale';
import { ConstructorState } from '../../Store/ConstructorState';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { getCentralSquareOfRectangle } from '../../utils/Trigonometry/getCentralSquareOfRectangle';
import { FillCentralSquare } from '../FillCentralSquare';
import * as c from './index.pcss';

export type ScaleViewOwnProps = {
    width: number;
    height: number;
    children: React.ReactNode;
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

        const rectangle = getRectangleByScale(scaleCoordinates, zoom, relation);
        const square = getCentralSquareOfRectangle(rectangle);

        return <FillCentralSquare
            width={ width }
            height={ height }
            className={ c.ScaleView__fillCentralSquare }
        >
            <div
                className={ c.ScaleView__scaleDiv }
                style={ {
                    top: `${square.y}%`,
                    left: `${square.x}%`,
                    height: `${square.size}%`,
                    width: `${square.size}%`,
                } }
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
                             children,
                         }: ScaleViewOwnProps): ScaleViewProps => ({
    scaleCoordinates,
    zoom,
    relation,
    width,
    height,
    children,
});

export const ScaleView = connect(mapStateToProps)(ScaleViewComponent);
