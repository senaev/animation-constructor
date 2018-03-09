import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';
import { AnimationElementFieldsTypes } from './AnimationElementFieldsTypes';
import { AnimationElementName } from './AnimationElementName';

export abstract class AnimationElement<T extends AnimationElementName> {

    constructor(protected readonly container: HTMLDivElement,
                protected size: UnitTypes[Unit.pixel],
                public values: AnimationElementFieldsTypes<T>) {
    }

    public setSize(size: UnitTypes[Unit.pixel]): void {
        this.size = size;

        this.setValues(this.values);
    }

    public abstract setValues(values: AnimationElementFieldsTypes<T>): void;
}

export interface AnimationElementClass<T extends AnimationElementName> {
    new(container: HTMLDivElement,
        size: UnitTypes[Unit.pixel],
        values: AnimationElementFieldsTypes<T>): AnimationElement<T>;
}
