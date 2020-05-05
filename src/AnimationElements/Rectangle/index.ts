import { UnitTypes } from '../../Unit/UnitTypes';
import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { createDivWithClass } from '../../utils/createDivWithClass';
import { AnimationElement } from '../AnimationElement';
import { AnimationElementFieldsTypes } from '../AnimationElementFieldsTypes';
import * as c from './index.pcss';

export class Rectangle extends AnimationElement<'Rectangle'> {
    private readonly rectangleDiv: HTMLElement;

    constructor(container: HTMLDivElement,
                values: AnimationElementFieldsTypes<'Rectangle'>,
                size: UnitTypes['pixel']) {
        super(container, values, size);

        this.rectangleDiv = createDivWithClass(container, c.Rectangle);

        this.setValues(values, size);
    }

    public setValues(values: AnimationElementFieldsTypes<'Rectangle'>,
                     size: UnitTypes['pixel']) {
        const { backgroundColor, borderRadius } = values;
        const { style } = this.rectangleDiv;

        style.backgroundColor = colorToRGBAString(backgroundColor);
        style.borderRadius = `${size * (borderRadius / 100)}px`;

        this.values = values;
    }
}
