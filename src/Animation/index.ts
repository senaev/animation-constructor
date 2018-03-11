import { ALL_STANDARD_ELEMENTS } from '../AnimationElements/ALL_STANDARD_ELEMENTS';
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

            const AnimationElementClass = ALL_STANDARD_ELEMENTS[elementName];
            const animationElement = new AnimationElementClass(
                container,
                this.getBlockSize(initialBlock),
                initialFieldValues,
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
            // TODO: set just changed values
            applyBlockToElement(container, getBlockByAnimationPosition(animationPosition));
            animationElement.setValues(getFieldValuesByAnimationPosition(animationPosition));
        }
    }

    public getAnimationPosition(): number {
        return this.animationPosition;
    }

    public setSize(size: number): void {
        this.size = size;

        for (const { animationElement, getBlockByAnimationPosition } of this.elementsAnimations) {
            // TODO: если где-то хранить текущее значение позиции, в это месте его не придется высчитывать
            const block = getBlockByAnimationPosition(this.animationPosition);

            animationElement.setSize(this.getBlockSize(block));
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
