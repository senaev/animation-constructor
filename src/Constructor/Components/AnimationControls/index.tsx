import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { addStylesToPage } from '../../../utils/addStylesToPage';
import { clamp } from '../../../utils/clamp';
import { ResizeSensor } from '../../../utils/ResizeSensor';
import { setAnimationPositionAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { Timeline } from '../Timeline';

export type AnimationControlsOwnProps = {};
export type AnimationControlsStateProps = Pick<ConstructorState,
    | 'animationPosition'>;
export type AnimationControlsDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorState['animationPosition']) => void;
};

export type AnimationControlsProps =
    & AnimationControlsOwnProps
    & AnimationControlsStateProps
    & AnimationControlsDispatchProps;

// TODO
addStylesToPage(document, require('./index.css'));

class AnimationControlsComponent extends React.Component<AnimationControlsProps, {}> {
    private resizeSensor: ResizeSensor;

    private containerElement: HTMLDivElement;
    private containerWidth: number;

    private startAnimationPosition = 0;

    public render() {
        const { animationPosition } = this.props;

        return <div
            className={ 'AnimationControls' }
            ref={ (element) => {
                this.containerElement = element!;
            } }
        >
            <Timeline timelinePoints={ [{
                position: animationPosition,
                onPositionChangeStart: this.onPositionChangeStart,
                onPositionChange: this.onPositionChange,
            }] }>
                <div className={ 'AnimationControls__positionTimeline' }/>
            </Timeline>
        </div>;
    }

    public componentDidMount() {
        this.resizeSensor = new ResizeSensor(this.containerElement, ({ width }) => {
            this.containerWidth = width;
        });

        this.containerWidth = this.resizeSensor.getSize().width;
    }

    public componentWillUnmount() {
        this.resizeSensor.destroy();
    }

    private onPositionChangeStart = () => {
        this.startAnimationPosition = this.props.animationPosition;
    }

    private onPositionChange = (pixelOffset: number) => {
        const rawAnimationPosition = this.startAnimationPosition + pixelOffset / this.containerWidth;
        const newAnimationPosition = clamp(rawAnimationPosition, 0, 1);

        this.props.setAnimationPosition(newAnimationPosition);
    }
}

const mapStateToProps = ({
                             animationPosition,
                         }: ConstructorState): AnimationControlsStateProps => {
    return {
        animationPosition,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): AnimationControlsDispatchProps => ({
    setAnimationPosition: (animationPosition) => {
        dispatch(setAnimationPositionAction(animationPosition));
    },
});

export const AnimationControls = connect(mapStateToProps, mapDispatchToProps)(AnimationControlsComponent);
