import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { scaleOneDimensionalLineSegment } from './scaleOneDimensionalLineSegment';

export function scaleRectangle(rectangle: PointCoordinates & Size,
                               scaleCenter: PointCoordinates,
                               coefficient: number): PointCoordinates & Size {
    const {
        beginning: nextX,
        length: nextWidth,
    } = scaleOneDimensionalLineSegment(
        {
            beginning: rectangle.x,
            length: rectangle.width,
        },
        scaleCenter.x,
        coefficient,
    );

    const {
        beginning: nextY,
        length: nextHeight,
    } = scaleOneDimensionalLineSegment(
        {
            beginning: rectangle.y,
            length: rectangle.height,
        },
        scaleCenter.y,
        coefficient,
    );

    return {
        x: nextX,
        y: nextY,
        width: nextWidth,
        height: nextHeight,
    };
}
