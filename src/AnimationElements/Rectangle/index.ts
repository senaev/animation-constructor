import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { createDivWithClass } from '../../utils/createDivWithClass';
import { AnimationElement } from '../AnimationElement';
import { AnimationElementFieldsTypes } from '../AnimationElementFieldsTypes';
import { AnimationElements } from '../AnimationElements';
import * as c from './index.pcss';

type ElementName = typeof AnimationElements.Rectangle;

export class Rectangle extends AnimationElement<ElementName> {
    private readonly rectangleDiv: HTMLElement;

    constructor(container: HTMLDivElement,
                values: AnimationElementFieldsTypes<ElementName>,
                size: UnitTypes[Unit.pixel]) {
        super(container, values, size);

        this.rectangleDiv = createDivWithClass(container, c.Rectangle);

        this.setValues(values, size);
    }

    public setValues(values: AnimationElementFieldsTypes<ElementName>,
                     size: UnitTypes[Unit.pixel]) {
        const { backgroundColor, borderRadius } = values;
        const { style } = this.rectangleDiv;

        style.backgroundColor = colorToRGBAString(backgroundColor);
        style.borderRadius = `${size * (borderRadius / 100)}px`;

        this.values = values;
    }
}
