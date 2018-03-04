import deepEqual = require('deep-equal');
import * as React from 'react';
import { Animation } from '../../../Animation';
import { AnimationScript } from '../../../AnimationScript';
import { BlockLocation } from '../../../BlockLocation/BlockLocation';
import { getBlockLocationByElement } from '../../../BlockLocation/getBlockLocationByElement';
import { addElementEventListener } from '../../../utils/addElementEventListener';
import { noop } from '../../../utils/noop';
import { ResizeSensor } from '../../../utils/ResizeSensor';
import { ConstructorState } from '../../Store/State';


export type AnimationPreviewProps = Pick<ConstructorState,
    | 'animationScript'
    | 'animationPosition'> & {
    onSelectBlock: (blockLocation: BlockLocation) => void,
};

export class AnimationPreview extends React.Component<AnimationPreviewProps, {}> {
    private container: HTMLDivElement;
    private resizeSensor: ResizeSensor;
    private animation: Animation;

    private removeElementClickListener = noop;

    public render() {
        return <div ref={ (element) => {
            this.container = element!;
        } }/>;
    }

    public componentDidMount() {
        this.resizeSensor = new ResizeSensor(this.container.parentElement!, ({ width, height }) => {
            const size = Math.min(width, height);
            this.animation.setSize(size);
        });

        const {
            animationScript,
            animationPosition,
        } = this.props;

        this.recreateAnimation(animationScript, animationPosition);


        this.removeElementClickListener = addElementEventListener(this.container, 'click', ({ target }) => {
            const blockLocation = getBlockLocationByElement(
                this.container,
                target as HTMLElement,
                this.animation.elementsAnimations
            );

            if (blockLocation !== undefined) {
                this.props.onSelectBlock(blockLocation);
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
            this.animation.setAnimationPosition(newAnimationPosition);
        }

        if (!deepEqual(animationScript, newAnimationScript)) {
            this.recreateAnimation(newAnimationScript, newAnimationPosition);
        }
    }

    public componentWillUnmount() {
        this.removeElementClickListener();
        this.resizeSensor.destroy();
    }

    private recreateAnimation(animationScript: AnimationScript, animationPosition: number) {
        if (this.animation) {
            this.animation.destroy();
        }

        const { width, height } = this.resizeSensor.getSize();

        this.animation = new Animation(
            this.container,
            animationScript,
            animationPosition,
            Math.min(width, height),
        );
    }
}
