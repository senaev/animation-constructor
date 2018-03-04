import { Color } from '../../Color/Color';

const parseColor: (colorString: string) => {
    rgba: [number, number, number, number];
} = require('parse-color');

export function colorStringToColor(colorString: string): Color {
    const [r, g, b, a] = parseColor(colorString).rgba;

    return {
        r,
        g,
        b,
        a,
    };
}
