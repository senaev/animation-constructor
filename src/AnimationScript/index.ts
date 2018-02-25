import { AnimationElementsFieldsUnits } from '../AnimationElements/AnimationElementFields';
import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { BlockPositionFieldUnits } from '../BlockPosition/BlockPositionFieldUnits';
import { EasingName } from '../Easing/EasingName';
import { UnitName } from '../UnitName/UNIT_NAMES';
import { UnitTypes } from '../UnitName/UnitTypes';

export type ScriptAction<T extends UnitName> = {
    duration: number;
    value: UnitTypes[T];
    easingName: EasingName | undefined;
};

export type UnitScript<T extends UnitName> = {
    unit: T;
    actions: ScriptAction<T>[];
};

export type BlockPositionScript = UnitScripts<BlockPositionFieldUnits>;

export type AnimationElementFieldsScript<T extends AnimationElementName> = UnitScripts<AnimationElementsFieldsUnits[T]>;

export type UnitScripts<T extends Record<string, UnitName>>
    = Record<keyof T, UnitScript<T[keyof T]>>;

export type AnimationElementScript<T extends AnimationElementName = AnimationElementName> = {
    elementName: T;
    blockPositionScript: BlockPositionScript;
    fieldsScript: AnimationElementFieldsScript<T>;
};

export type AnimationScript = AnimationElementScript[];
