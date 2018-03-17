import { DEFAULT_RELATION } from './DEFAULT_RELATION';

const {
    width,
    height,
} = DEFAULT_RELATION;

const relation = width < height
    ? width / height
    : height / width;

const DEFAULT_ZOOM_COEFFICIENT = 0.95;

export const DEFAULT_ZOOM = relation * DEFAULT_ZOOM_COEFFICIENT;
