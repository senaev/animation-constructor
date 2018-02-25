import { Unit } from '../UnitName/Unit';
import { UnitTypes } from '../UnitName/UnitTypes';
import { AnimationElementFieldsTypes } from './AnimationElementFields';
import { AnimationElementName } from './AnimationElementName';

export abstract class AnimationElement<T extends AnimationElementName> {
    constructor(protected readonly container: HTMLDivElement,
                protected size: UnitTypes[Unit.pixel],
                public values: AnimationElementFieldsTypes<T>) {
        this.drawLayout(container);
        this.setValuesAbstract(values);
    }

    public setValuesAbstract(values: AnimationElementFieldsTypes<T>): void {
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
        values: AnimationElementFieldsTypes<T>): AnimationElement<T>;
}
