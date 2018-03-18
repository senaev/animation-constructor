import { ALL_ANIMATION_ELEMENTS } from '../AnimationElements/ALL_ANIMATION_ELEMENTS';
import { AnimationScript } from '../AnimationScript';
import { Block } from '../Block/Block';
import { applyBlockToElement } from '../Block/utils/applyBlockToElement';
import { removeNodeFromParent } from '../utils/removeNodeFromParent';
import { ElementsAnimations } from './ElementsAnimations';
import * as c from './index.pcss';
import { createFieldsFunctionByFieldsScripts } from './util/createFieldsFunctionByFieldsScripts';

export class Animation {
    // use just in constructor
    public elementsAnimations: ElementsAnimations;

    constructor(animationContainer: HTMLDivElement,
                animationScript: AnimationScript,
                private animationPosition: number,
                private size: number) {

        this.elementsAnimations = animationScript.map(({
                                                           elementName,
                                                           blockScript,
                                                           fieldsScript,
                                                       }) => {
            const { ownerDocument } = animationContainer;
            const container = ownerDocument.createElement('div');
            container.className = c.AnimationBlock;

            const getBlockByAnimationPosition =
                createFieldsFunctionByFieldsScripts(blockScript);
            const getFieldValuesByAnimationPosition = createFieldsFunctionByFieldsScripts(fieldsScript);

            const initialBlock = getBlockByAnimationPosition(animationPosition);
            applyBlockToElement(container, initialBlock);

            const initialFieldValues = getFieldValuesByAnimationPosition(animationPosition);

            const AnimationElementClass = ALL_ANIMATION_ELEMENTS[elementName];
            const animationElement = new AnimationElementClass(
                container,
                initialFieldValues,
                this.getBlockSize(initialBlock),
            );

            animationContainer.appendChild(container);

            return {
                animationElement,
                container,
                getBlockByAnimationPosition,
                getFieldValuesByAnimationPosition,
            };
        });
    }

    public setAnimationPosition(animationPosition: number): void {
        this.animationPosition = animationPosition;

        // TODO: пересчитывать только если значение изменилось
        for (const {
            animationElement,
            container,
            getBlockByAnimationPosition,
            getFieldValuesByAnimationPosition,
        } of this.elementsAnimations) {
            const block = getBlockByAnimationPosition(animationPosition);
            const fieldsValues = getFieldValuesByAnimationPosition(animationPosition);
            const blockSize = this.getBlockSize(block);

            applyBlockToElement(container, block);
            animationElement.setValues(
                fieldsValues,
                blockSize,
            );
        }
    }

    public getAnimationPosition(): number {
        return this.animationPosition;
    }

    public setSize(size: number): void {
        this.size = size;

        const { animationPosition } = this;

        for (const {
            animationElement,
            getBlockByAnimationPosition,
            getFieldValuesByAnimationPosition,
        } of this.elementsAnimations) {
            const block = getBlockByAnimationPosition(animationPosition);
            const fieldsValues = getFieldValuesByAnimationPosition(animationPosition);
            const blockSize = this.getBlockSize(block);

            animationElement.setValues(
                fieldsValues,
                blockSize,
            );
        }
    }

    public destroy(): void {
        this.elementsAnimations.forEach(({ container }) => {
            removeNodeFromParent(container);
        });

        this.elementsAnimations = [];
    }

    private getBlockSize({ width, height }: Block): number {
        return (Math.min(width, height) * this.size) / 100;
    }
}
