import { UnitTypes } from '../Unit/UnitTypes';
import { AnimationElementFieldsTypes } from './AnimationElementFieldsTypes';
import { AnimationElements } from './AnimationElements';

export abstract class AnimationElement<T extends AnimationElements> {

    constructor(protected readonly container: HTMLDivElement,
                public values: AnimationElementFieldsTypes<T>,
                protected size: UnitTypes['pixel']) {
    }

    public abstract setValues(values: AnimationElementFieldsTypes<T>,
                              size: UnitTypes['pixel']): void;
}

export interface AnimationElementClass<T extends AnimationElements> {
    new(container: HTMLDivElement,
        values: AnimationElementFieldsTypes<T>,
        size: UnitTypes['pixel']): AnimationElement<T>;
}
