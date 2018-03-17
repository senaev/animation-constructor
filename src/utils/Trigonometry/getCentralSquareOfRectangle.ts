import { Square } from './Types/Square';

export function getCentralSquareOfRectangle(width: number, height: number): Square {
    const size = width > height
        ? height
        : width;

    const x = width > height
        ? (width - size) / 2
        : 0;
    const y = width > height
        ? 0
        : (height - size) / 2;

    return {
        size,
        x,
        y,
    };
}
