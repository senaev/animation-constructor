import { BlockPosition } from '../BlockPosition/BlockPosition';
import { applyBlockPositionToElement } from '../BlockPosition/utils/applyBlockPositionToElement';
import { createDivWithClass } from '../utils/createDivWithClass';
import { removeNodeFromParent } from '../utils/removeNodeFromParent';
import * as c from './index.pcss';

export class Block {
    public readonly element: HTMLDivElement;

    private position: BlockPosition;

    constructor(container: HTMLDivElement,
                initialPosition: BlockPosition,
                // TODO: add flexible option
                flexibility: boolean) {
        this.element = createDivWithClass(container, c.Block);
        this.setPosition(initialPosition);
    }

    public getPosition(): BlockPosition {
        return { ...this.position };
    }

    public setPosition(position: BlockPosition): void {
        this.position = { ...position };
        applyBlockPositionToElement(this.element, this.position);
    }

    public destroy(): void {
        removeNodeFromParent(this.element);
    }
}
