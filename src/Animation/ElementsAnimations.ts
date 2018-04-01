import { AnimationElement } from '../AnimationElements/AnimationElement';
import { AnimationElementFieldsTypes } from '../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElements } from '../AnimationElements/AnimationElements';
import { Block } from '../Block/Block';

export type ElementAnimation<T extends AnimationElements> = {
    animationElement: AnimationElement<T>;
    container: HTMLDivElement;
    getBlockByAnimationPosition: (position: number) => Block;
    getFieldValuesByAnimationPosition: (position: number) => AnimationElementFieldsTypes<T>;
};

export type ElementsAnimations = ElementAnimation<AnimationElements>[];
