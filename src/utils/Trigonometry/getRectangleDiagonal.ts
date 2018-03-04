import { Size } from '../../types/Size';

// https://jing.yandex-team.ru/files/senaev/2018-01-20_06.47.40-2pwsy.png
// TODO: hypot
export function getRectangleDiagonal({ width, height }: Size): number {
    return Math.sqrt(width ** 2 + height ** 2);
}
