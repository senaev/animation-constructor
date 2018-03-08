import { colorToRGBAString } from '../../utils/colorToRGBAString';
import { createDivWithClass } from '../../utils/createDivWithClass';
import { AnimationElement } from '../AnimationElement';
import { AnimationElements } from '../AnimationElements';
import * as c from './index.pcss';

export class Rectangle extends AnimationElement<AnimationElements.Rectangle> {
    private rectangleDiv: HTMLElement;

    protected drawLayout(container: HTMLDivElement) {
        this.rectangleDiv = createDivWithClass(container, c.Rectangle);
    }

    protected setValues() {
        const { size } = this;
        const { backgroundColor, borderRadius } = this.values;

        this.rectangleDiv.style.backgroundColor = colorToRGBAString(backgroundColor);
        this.rectangleDiv.style.borderRadius = `${size * (borderRadius / 100)}px`;
    }
}
