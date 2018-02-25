import { BlockSize } from '../../BlockPosition/BlockPosition';

// https://jing.yandex-team.ru/files/senaev/2018-01-20_06.47.40-2pwsy.png
export function getRectangleDiagonal({ width, height }: BlockSize): number {
    return Math.sqrt(width ** 2 + height ** 2);
}
