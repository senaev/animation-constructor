import { Block } from '../Block';

export function blockToStyles({
                                  y,
                                  x,
                                  height,
                                  width,
                                  rotation,
                                  existence,
                              }: Block): {
    top: string;
    left: string;
    height: string;
    width: string;
    transform: string;
    transformOrigin: string;
    display: 'block' | 'none';
} {
    return {
        top: `${y}%`,
        left: `${x}%`,
        height: `${height}%`,
        width: `${width}%`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: '0 0',
        display: existence ? 'block' : 'none',
    };
}
