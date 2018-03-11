import { AnimationElement } from '../AnimationElements/AnimationElement';
import { AnimationElementFieldsTypes } from '../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { Block } from '../Block/Block';

export type ElementAnimation<T extends AnimationElementName> = {
    animationElement: AnimationElement<T>;
    container: HTMLDivElement;
    getBlockByAnimationPosition: (position: number) => Block;
    getFieldValuesByAnimationPosition: (position: number) => AnimationElementFieldsTypes<T>;
};

export type ElementsAnimations = ElementAnimation<AnimationElementName>[];
