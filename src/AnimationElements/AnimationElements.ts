import { Mirror } from '../types/Mirror';

const Rectangle = 'Rectangle';

export type AnimationElementName =
    | typeof Rectangle;

export const AnimationElements: Mirror<AnimationElementName> = {
    Rectangle,
};
export type AnimationElements = AnimationElementName;
