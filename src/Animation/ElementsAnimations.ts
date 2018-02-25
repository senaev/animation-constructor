import { AnimationElement } from '../AnimationElements/AnimationElement';
import { AnimationElementsFieldsTypes } from '../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { BlockPosition } from '../BlockPosition/BlockPosition';
import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';

export type ElementAnimation = {
    animationElement: AnimationElement<Record<string, UnitTypes[UnitName]>>;
    container: HTMLDivElement;
    getBlockPositionByAnimationPosition: (position: number) => BlockPosition;
    getFieldValuesByAnimationPosition: (position: number) => AnimationElementsFieldsTypes[AnimationElementName];
};

export type ElementsAnimations = ElementAnimation[];
