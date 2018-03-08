import { AnimationElement } from '../AnimationElements/AnimationElement';
import { AnimationElementFieldsTypes } from '../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { BlockPosition } from '../BlockPosition/BlockPosition';

export type ElementAnimation<T extends AnimationElementName> = {
    animationElement: AnimationElement<T>;
    container: HTMLDivElement;
    getBlockPositionByAnimationPosition: (position: number) => BlockPosition;
    getFieldValuesByAnimationPosition: (position: number) => AnimationElementFieldsTypes<T>;
};

export type ElementsAnimations = ElementAnimation<AnimationElementName>[];
