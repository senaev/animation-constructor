import { Unit } from '../Unit/Unit';
import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';

export abstract class AnimationElement<T extends Record<string, UnitTypes[UnitName]>> {

    constructor(protected readonly container: HTMLDivElement,
                protected size: UnitTypes[Unit.pixel],
                public values: T) {
        this.drawLayout(container);
        this.setValuesAbstract(values);
    }

    public setValuesAbstract(values: T): void {
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

export interface AnimationElementClass<T extends Record<string, UnitTypes[UnitName]>> {
    new(container: HTMLDivElement,
        size: UnitTypes[Unit.pixel],
        values: T): AnimationElement<T>;
}
