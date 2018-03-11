import { Block } from '../Block';

export function blockToStyles({
                                  y,
                                  x,
                                  height,
                                  width,
                                  rotation,
                              }: Block): {
    top: string;
    left: string;
    height: string;
    width: string;
    transform: string;
    transformOrigin: string;
} {
    return {
        top: `${y}%`,
        left: `${x}%`,
        height: `${height}%`,
        width: `${width}%`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: '0 0',
    };
}
