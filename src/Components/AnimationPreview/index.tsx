import deepEqual = require('deep-equal');
import * as React from 'react';
import { Animation } from '../../Animation';
import { AnimationScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { getBlockLocationByElement } from '../../BlockLocation/getBlockLocationByElement';
import { ConstructorState } from '../../Store/ConstructorState';
import { getIfNodeIsChild } from '../../utils/getIfNodeIsChild';
import { ResizeSensor } from '../../utils/ResizeSensor';
import * as c from './index.pcss';


export type AnimationPreviewProps = Pick<ConstructorState,
    | 'animationScript'
    | 'animationPosition'>;

export class AnimationPreview extends React.Component<AnimationPreviewProps, {}> {
    private container?: HTMLDivElement | null;
    private animationContainer?: HTMLDivElement | null;
    private resizeSensor?: ResizeSensor;
    private animation?: Animation;

    public render() {
        return <div
            className={ c.AnimationPreview }
            ref={ (element) => {
                this.container = element;
            } }
        >
            <div
                ref={ (element) => {
                    this.animationContainer = element;
                } }
                className={ c.AnimationPreview__resetPointerEvents }
            />
        </div>;
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
            animation,
            animationContainer,
        } = this;

        if (!animationContainer || !animation) {
            throw new Error('One of properties has not been initialized');
        }

        return getBlockLocationByElement(
            animationContainer,
            element,
            animation.elementsAnimations,
        );
    }

    public componentDidMount() {
        const { container } = this;

        if (!container) {
            throw new Error('Container element has not been initialized');
        }

        this.resizeSensor = new ResizeSensor(container, ({ width, height }) => {
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

        const { animationContainer } = this;

        if (!animationContainer) {
            throw new Error('Container element has not been initialized');
        }

        this.animation = new Animation(
            animationContainer,
            animationScript,
            animationPosition,
            Math.min(width, height),
        );
    }
}
