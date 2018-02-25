export function clamp (value: number, min: number, max: number) {
    if (value > max) {
        return max;
    } else if (value < min) {
        return min;
    } else {
        return value;
    }
}
