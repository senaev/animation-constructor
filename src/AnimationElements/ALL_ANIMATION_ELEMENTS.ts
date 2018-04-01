import { AnimationElementClass } from './AnimationElement';
import { AnimationElements } from './AnimationElements';
import { Rectangle } from './Rectangle';

export const ALL_ANIMATION_ELEMENTS: {
    [key in AnimationElements]: AnimationElementClass<key>;
} = {
    [AnimationElements.Rectangle]: Rectangle,
};
