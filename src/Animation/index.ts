import { ALL_STANDARD_ELEMENTS } from '../AnimationElements/ALL_STANDARD_ELEMENTS';
import { AnimationScript } from '../AnimationScript';
import { BlockPosition } from '../BlockPosition/BlockPosition';
import { applyBlockPositionToElement } from '../BlockPosition/utils/applyBlockPositionToElement';
import { removeNodeFromParent } from '../utils/removeNodeFromParent';
import { ElementsAnimations } from './ElementsAnimations';
import * as c from './index.pcss';
import { createFieldsFunctionByUnitScripts } from './util/createFieldsFunctionByUnitScripts';

export class Animation {
    // use just in constructor
    public elementsAnimations: ElementsAnimations;

    constructor(animationContainer: HTMLDivElement,
                animationScript: AnimationScript,
                private animationPosition: number,
                private size: number) {

        this.elementsAnimations = animationScript.map(({
                                                           elementName,
                                                           blockPositionScript,
                                                           fieldsScript,
                                                       }) => {
            const { ownerDocument } = animationContainer;
            const container = ownerDocument.createElement('div');
            container.className = c.AnimationBlock;

            const getBlockPositionByAnimationPosition =
                createFieldsFunctionByUnitScripts(blockPositionScript) as (animationPosition: number) => BlockPosition;
            const getFieldValuesByAnimationPosition = createFieldsFunctionByUnitScripts(fieldsScript);

            const initialBlockPosition = getBlockPositionByAnimationPosition(animationPosition);
            applyBlockPositionToElement(container, initialBlockPosition);

            const initialFieldValues = getFieldValuesByAnimationPosition(animationPosition);

            const AnimationElementClass = ALL_STANDARD_ELEMENTS[elementName];
            const animationElement = new AnimationElementClass(
                container,
                this.getBlockSize(initialBlockPosition),
                initialFieldValues,
            );

            animationContainer.appendChild(container);

            return {
                animationElement,
                container,
                getBlockPositionByAnimationPosition,
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
            getBlockPositionByAnimationPosition,
            getFieldValuesByAnimationPosition,
        } of this.elementsAnimations) {
            // TODO: set just changed values
            applyBlockPositionToElement(container, getBlockPositionByAnimationPosition(animationPosition));
            animationElement.setValuesAbstract(getFieldValuesByAnimationPosition(animationPosition));
        }
    }

    public getAnimationPosition(): number {
        return this.animationPosition;
    }

    public setSize(size: number): void {
        this.size = size;

        for (const { animationElement, getBlockPositionByAnimationPosition } of this.elementsAnimations) {
            // TODO: если где-то хранить текущее значение позиции, в это месте его не придется высчитывать
            const blockPosition = getBlockPositionByAnimationPosition(this.animationPosition);

            animationElement.setSize(this.getBlockSize(blockPosition));
        }
    }

    public destroy(): void {
        this.elementsAnimations.forEach(({ container }) => {
            removeNodeFromParent(container);
        });

        this.elementsAnimations = [];
    }

    private getBlockSize({ width, height }: BlockPosition): number {
        return (Math.min(width, height) * this.size) / 100;
    }
}
