import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { createDivWithClass } from '../../utils/createDivWithClass';
import { AnimationElement } from '../AnimationElement';
import { AnimationElementFieldsTypes } from '../AnimationElementFieldsTypes';
import { AnimationElements } from '../AnimationElements';
import * as c from './index.pcss';

type ElementName = AnimationElements.Rectangle;

export class Rectangle extends AnimationElement<ElementName> {
    private readonly rectangleDiv: HTMLElement;

    constructor(container: HTMLDivElement,
                size: UnitTypes[Unit.pixel],
                values: AnimationElementFieldsTypes<ElementName>) {
        super(container, size, values);

        this.rectangleDiv = createDivWithClass(container, c.Rectangle);

        this.setValues(values);
    }

    public setValues(values: AnimationElementFieldsTypes<ElementName>) {
        const { size } = this;
        const { backgroundColor, borderRadius } = values;

        this.rectangleDiv.style.backgroundColor = colorToRGBAString(backgroundColor);
        this.rectangleDiv.style.borderRadius = `${size * (borderRadius / 100)}px`;

        this.values = values;
    }
}
