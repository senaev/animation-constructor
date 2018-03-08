import { AnimationElementClass } from './AnimationElement';
import { AnimationElementName } from './AnimationElementName';
import { Rectangle } from './Rectangle';

export const ALL_STANDARD_ELEMENTS: {
    [key in AnimationElementName]: AnimationElementClass<key>;
} = {
    Rectangle,
};
