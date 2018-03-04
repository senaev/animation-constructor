import { Color } from '../../types/Color';

export function colorToRGBAString({ r, g, b, a }: Color): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
