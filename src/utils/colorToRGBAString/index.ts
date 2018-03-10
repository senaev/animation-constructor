import { Color } from '../../Color/Color';

export function colorToRGBAString({ r, g, b, a }: Color): string {
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`;
}
