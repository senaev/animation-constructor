import { AnimationElementName } from '../AnimationElements/AnimationElementName';
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

export type UnitScripts = Record<string, UnitScript<UnitName>>;

export type AnimationElementScript<T extends AnimationElementName = AnimationElementName> = {
    elementName: T;
    blockPositionScript: UnitScripts;
    fieldsScript: UnitScripts;
};

export type AnimationScript = AnimationElementScript[];
