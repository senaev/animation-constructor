import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';

export function getRectangleByScale(scaleCoordinates: PointCoordinates,
                                    zoom: number,
                                    relation: Size): PointCoordinates & Size {
    const zoomPercent = zoom * 100;

    const squareCoordinates = {
        x: scaleCoordinates.x - zoomPercent / 2,
        y: scaleCoordinates.y - zoomPercent / 2,
    };

    const relationCoefficient = relation.width / relation.height;
    const isHorizontal = relationCoefficient > 1;

    const width = isHorizontal
        ? zoomPercent * relationCoefficient
        : zoomPercent;
    const height = isHorizontal
        ? zoomPercent
        : (1 / relationCoefficient) * zoomPercent;

    const x = isHorizontal
        ? squareCoordinates.x - (width - zoomPercent) / 2
        : squareCoordinates.x;

    const y = isHorizontal
        ? squareCoordinates.y
        : squareCoordinates.y - (height - zoomPercent) / 2;

    return {
        x,
        y,
        width,
        height,
    };
}
