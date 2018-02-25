import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';
import { noop } from '../utils/noop';
import { AnimationElementsFieldsValues } from './AnimationElementFields';
import { AnimationElementName } from './AnimationElementName';

export abstract class AnimationElement<T extends AnimationElementName> {
    // TODO: remove
    private readonly lalala?: T;

    constructor(protected readonly container: HTMLDivElement,
                protected size: UnitTypes[Unit.pixel],
                public values: AnimationElementsFieldsValues) {
        this.drawLayout(container);
        this.setValuesAbstract(values);

        // TODO: remove
        noop(this.lalala);
    }

    public setValuesAbstract(values: AnimationElementsFieldsValues): void {
        this.values = values;

        this.setValues();
    }

    public setSize(size: UnitTypes[Unit.pixel]): void {
        this.size = size;

        this.setValues();
    }

    protected abstract setValues(): void;

    // В этом методе только отрисовываем слои в нужной последовательности
    // Do not change container styles/properties inside of AnimationElement
    protected abstract drawLayout(container: HTMLDivElement): void;
}

export interface AnimationElementClass<T extends AnimationElementName = AnimationElementName> {
    new(container: HTMLDivElement,
        size: UnitTypes[Unit.pixel],
        values: AnimationElementsFieldsValues): AnimationElement<T>;
}
