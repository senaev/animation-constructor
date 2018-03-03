import { AnimationElement } from '../AnimationElements/AnimationElement';
import { AnimationElementFieldsValues } from '../AnimationElements/AnimationElementsFieldsValues';
import { BlockPosition } from '../BlockPosition/BlockPosition';
import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';

export type ElementAnimation = {
    animationElement: AnimationElement<Record<string, UnitTypes[UnitName]>>;
    container: HTMLDivElement;
    getBlockPositionByAnimationPosition: (position: number) => BlockPosition;
    getFieldValuesByAnimationPosition: (position: number) => AnimationElementFieldsValues;
};

export type ElementsAnimations = ElementAnimation[];
