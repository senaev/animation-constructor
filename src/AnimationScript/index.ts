import { AnimationElements } from '../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../AnimationElements/AnimationElementsFieldsUnits';
import { BlockFieldUnits } from '../Block/BlockFieldUnits';
import { EasingName } from '../Easing/EasingName';
import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';

export type Step<T extends Unit> = {
    duration: number;
    value: UnitTypes[T];
    easing: EasingName | undefined;
};

export type UnitScript<T extends Unit> = {
    unit: T;
    steps: Step<T>[];
};

export type FieldsScripts<T extends Record<string, Unit>> = {
    [key in keyof T]: UnitScript<T[key]>;
    };

export type BlockScript = FieldsScripts<BlockFieldUnits>;

export type AnimationElementFieldsScript<T extends AnimationElements>
    = FieldsScripts<AnimationElementsFieldsUnits[T]>;

export type AnimationElementScript<T extends AnimationElements> = {
    elementName: T;
    blockScript: BlockScript;
    fieldsScript: AnimationElementFieldsScript<T>;
};

export type AnimationScript = AnimationElementScript<AnimationElements>[];
