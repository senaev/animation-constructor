import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';
import { AnimationElementFieldsTypes } from './AnimationElementFieldsTypes';
import { AnimationElementName } from './AnimationElementName';

export abstract class AnimationElement<T extends AnimationElementName> {

    constructor(protected readonly container: HTMLDivElement,
                public values: AnimationElementFieldsTypes<T>,
                protected size: UnitTypes[Unit.pixel]) {
    }

    public abstract setValues(values: AnimationElementFieldsTypes<T>,
                              size: UnitTypes[Unit.pixel]): void;
}

export interface AnimationElementClass<T extends AnimationElementName> {
    new(container: HTMLDivElement,
        values: AnimationElementFieldsTypes<T>,
        size: UnitTypes[Unit.pixel]): AnimationElement<T>;
}
