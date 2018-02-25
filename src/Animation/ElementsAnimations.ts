import { AnimationElement } from '../AnimationElements/AnimationElement';
import { AnimationElementsFieldsTypes } from '../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { BlockPosition } from '../BlockPosition/BlockPosition';

export type ElementAnimation<T extends AnimationElementName> = {
    animationElement: AnimationElement<T>;
    container: HTMLDivElement;
    getBlockPositionByAnimationPosition: (position: number) => BlockPosition;
    getFieldValuesByAnimationPosition: (position: number) => AnimationElementsFieldsTypes[AnimationElementName];
};

export type ElementsAnimations = ElementAnimation<AnimationElementName>[];
