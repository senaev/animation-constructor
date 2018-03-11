import { Scale } from '../Scale';

export function scaleToStyles({
                                  y,
                                  x,
                                  width,
                                  height,
                              }: Scale): {
    top: string;
    left: string;
    width: string;
    height: string;
} {
    return {
        top: `${y}%`,
        left: `${x}%`,
        height: `${height}%`,
        width: `${width}%`,
    };
}
