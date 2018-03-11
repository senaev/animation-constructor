import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { AnimationElementsFieldsUnits } from '../AnimationElements/AnimationElementsFieldsUnits';
import { BlockFieldUnits } from '../Block/BlockFieldUnits';
import { EasingName } from '../Easing/EasingName';
import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';

export type ScriptAction<T extends Unit> = {
    duration: number;
    value: UnitTypes[T];
    easing: EasingName | undefined;
};

export type UnitScript<T extends Unit> = {
    unit: T;
    actions: ScriptAction<T>[];
};

export type FieldsScripts<T extends Record<string, Unit>> = {
    [key in keyof T]: UnitScript<T[key]>;
    };

export type BlockScript = FieldsScripts<BlockFieldUnits>;

export type AnimationElementFieldsScript<T extends AnimationElementName>
    = FieldsScripts<AnimationElementsFieldsUnits[T]>;

export type AnimationElementScript<T extends AnimationElementName> = {
    elementName: T;
    blockScript: BlockScript;
    fieldsScript: AnimationElementFieldsScript<T>;
};

export type AnimationScript = AnimationElementScript<AnimationElementName>[];
