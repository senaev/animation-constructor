import { AnimationElementName } from '../AnimationElements/AnimationElementName';
import { BlockPositionFieldUnits } from '../BlockPosition/BlockPositionFieldUnits';
import { EasingName } from '../Easing/EasingName';
import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';

export type ScriptAction<T extends UnitName> = {
    duration: number;
    value: UnitTypes[T];
    easing: EasingName | undefined;
};

export type UnitScript<T extends UnitName> = {
    unit: T;
    actions: ScriptAction<T>[];
};

export type BlockPositionScript = UnitScripts<BlockPositionFieldUnits>;

export type AnimationElementFieldsScript = UnitScripts<Record<string, UnitName>>;

export type UnitScripts<T extends Record<string, UnitName>>
    = Record<keyof T, UnitScript<T[keyof T]>>;

export type AnimationElementScript<T extends AnimationElementName = AnimationElementName> = {
    elementName: T;
    blockPositionScript: BlockPositionScript;
    fieldsScript: AnimationElementFieldsScript;
};

export type AnimationScript = AnimationElementScript[];
