import { addStylesToPage } from '../../utils/addStylesToPage';
import { createDivWithClass } from '../../utils/createDivWithClass';
import { AnimationElement } from '../AnimationElement';
import { AnimationElements } from '../AnimationElements';

export class Rectangle extends AnimationElement<AnimationElements.Rectangle> {
    private rectangleDiv: HTMLElement;

    protected drawLayout(container: HTMLDivElement) {
        addStylesToPage(container.ownerDocument, require('./index.css'));
        this.rectangleDiv = createDivWithClass(container, 'Rectangle');
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
