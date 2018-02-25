import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { createDivWithClass } from '../../utils/createDivWithClass';
import { AnimationElement } from '../AnimationElement';
import * as c from './index.pcss';

export type RectangleFields = {
    backgroundColor: UnitTypes[Unit.color];
    borderRadius: UnitTypes[Unit.percent];
};

export class Rectangle extends AnimationElement<RectangleFields> {
    private rectangleDiv: HTMLElement;

    protected drawLayout(container: HTMLDivElement) {
        this.rectangleDiv = createDivWithClass(container, c.Rectangle);
    }

    protected setValues() {
        const { size } = this;
        const { backgroundColor, borderRadius } = this.values;

        this.rectangleDiv.style.backgroundColor = backgroundColor;
        this.rectangleDiv.style.borderRadius = `${size * (borderRadius / 100)}px`;
    }
}
