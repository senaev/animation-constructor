import deepEqual = require('deep-equal');
import * as React from 'react';
import { Animation } from '../../Animation';
import { AnimationScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { getBlockLocationByElement } from '../../BlockLocation/getBlockLocationByElement';
import { ConstructorStore } from '../../Store/State';
import { getIfNodeIsChild } from '../../utils/getIfNodeIsChild';
import { ResizeSensor } from '../../utils/ResizeSensor';
import * as c from './index.pcss';


export type AnimationPreviewProps = Pick<ConstructorStore,
    | 'animationScript'
    | 'animationPosition'>;

export class AnimationPreview extends React.Component<AnimationPreviewProps, {}> {
    private container?: HTMLDivElement | null;
    private resizeSensor?: ResizeSensor;
    private animation?: Animation;

    public render() {
        return <div
            className={ c.AnimationPreview }
            ref={ (element) => {
                this.container = element;
            } }
        />;
    }

    public getIfHTMLElementIsPartOfAnimation(element: HTMLElement): boolean {
        const {
            container,
        } = this;

        if (!container) {
            throw new Error('One of properties has not been initialized');
        }

        return getIfNodeIsChild(container, element);
    }

    public getBlockLocationByHTMLElement(element: HTMLElement): BlockLocation | undefined {
        const {
            container,
            animation,
        } = this;

        if (!container || !animation) {
            throw new Error('One of properties has not been initialized');
        }

        return getBlockLocationByElement(
            container,
            element,
            animation.elementsAnimations,
        );
    }

    public componentDidMount() {
        const { container } = this;

        if (!container) {
            throw new Error('Container element has not been initialized');
        }

        const { parentElement } = container;

        if (!parentElement) {
            throw new Error('Container has no parent element');
        }

        this.resizeSensor = new ResizeSensor(parentElement, ({ width, height }) => {
            const size = Math.min(width, height);

            const { animation } = this;

            if (!animation) {
                throw new Error('Animation has not been initialized');
            }

            animation.setSize(size);
        });

        const {
            animationScript,
            animationPosition,
        } = this.props;

        this.recreateAnimation(animationScript, animationPosition);
    }

    public componentWillReceiveProps({
                                         animationScript: newAnimationScript,
                                         animationPosition: newAnimationPosition,
                                     }: AnimationPreviewProps) {
        const {
            animationScript,
            animationPosition,
        } = this.props;

        if (animationPosition !== newAnimationPosition) {
            const { animation } = this;

            if (!animation) {
                throw new Error('Animation has not been initialized');
            }

            animation.setAnimationPosition(newAnimationPosition);
        }

        if (!deepEqual(animationScript, newAnimationScript)) {
            this.recreateAnimation(newAnimationScript, newAnimationPosition);
        }
    }

    public componentWillUnmount() {
        const { resizeSensor } = this;

        if (!resizeSensor) {
            throw new Error('ResizeSensor has not been initialized');
        }

        resizeSensor.destroy();
    }

    private recreateAnimation(animationScript: AnimationScript, animationPosition: number) {
        if (this.animation) {
            this.animation.destroy();
        }

        const { resizeSensor } = this;

        if (!resizeSensor) {
            throw new Error('ResizeSensor has not been initialized');
        }

        const { width, height } = resizeSensor.getSize();

        const { container } = this;

        if (!container) {
            throw new Error('Container element has not been initialized');
        }

        this.animation = new Animation(
            container,
            animationScript,
            animationPosition,
            Math.min(width, height),
        );
    }
}
