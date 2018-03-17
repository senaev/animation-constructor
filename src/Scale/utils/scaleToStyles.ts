import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';

export function getRectangleByScale(scaleCoordinates: PointCoordinates,
                                    zoom: number,
                                    relation: Size): PointCoordinates & Size {
    const zoomPercent = zoom * 100;

    const relationCoefficient = relation.width / relation.height;
    const isHorizontal = relationCoefficient > 1;

    const width = isHorizontal
        ? zoomPercent * relationCoefficient
        : zoomPercent;
    const height = isHorizontal
        ? zoomPercent
        : (1 / relationCoefficient) * zoomPercent;

    const x = isHorizontal
        ? scaleCoordinates.x - (width - zoomPercent) / 2
        : scaleCoordinates.x;

    const y = isHorizontal
        ? scaleCoordinates.y
        : scaleCoordinates.y - (height - zoomPercent) / 2;

    return {
        x,
        y,
        width,
        height,
    };
}

export function scaleToStyles(scaleCoorsinates: PointCoordinates,
                              zoom: number,
                              relation: Size): {
    top: string;
    left: string;
    width: string;
    height: string;
} {
    const rectangle = getRectangleByScale(scaleCoorsinates, zoom, relation);

    return {
        top: `${rectangle.y}%`,
        left: `${rectangle.x}%`,
        height: `${rectangle.height}%`,
        width: `${rectangle.width}%`,
    };
}
