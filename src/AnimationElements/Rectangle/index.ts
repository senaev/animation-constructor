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
        const { color, borderRadius } = this.values;

        // TODO: normal type definition
        this.rectangleDiv.style.backgroundColor = color as string;
        // TODO: normal type definition
        this.rectangleDiv.style.borderRadius = `${size * (borderRadius as number / 100)}px`;
    }
}
