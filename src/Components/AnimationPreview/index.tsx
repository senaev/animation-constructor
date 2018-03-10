import deepEqual = require('deep-equal');
import * as React from 'react';
import { Animation } from '../../Animation';
import { AnimationScript } from '../../AnimationScript';
import { BlockLocation } from '../../BlockLocation/BlockLocation';
import { getBlockLocationByElement } from '../../BlockLocation/getBlockLocationByElement';
import { ConstructorState } from '../../Store/State';
import { addElementEventListener } from '../../utils/addElementEventListener';
import { noop } from '../../utils/noop';
import { ResizeSensor } from '../../utils/ResizeSensor';


export type AnimationPreviewProps = Pick<ConstructorState,
    | 'animationScript'
    | 'animationPosition'> & {
    onSelectBlock: (blockLocation: BlockLocation) => void,
};

export class AnimationPreview extends React.Component<AnimationPreviewProps, {}> {
    private container?: HTMLDivElement | null;
    private resizeSensor?: ResizeSensor;
    private animation?: Animation;

    private removeElementClickListener = noop;

    public render() {
        return <div ref={ (element) => {
            this.container = element;
        } }/>;
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


        this.removeElementClickListener = addElementEventListener(container, 'click', ({ target }) => {
            const { animation } = this;

            if (!animation) {
                throw new Error('Animation has not been initialized');
            }

            const blockLocation = getBlockLocationByElement(
                container,
                target as HTMLElement,
                animation.elementsAnimations,
            );

            if (blockLocation !== undefined) {
                this.props.onSelectBlock(blockLocation);
            } else {
                throw new Error('Cannot find location for block');
            }
        });
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
        this.removeElementClickListener();

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
