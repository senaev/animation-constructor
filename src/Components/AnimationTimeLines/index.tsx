import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import {
    setAnimationPositionAction, setBlockPositionScriptActionPositionAction,
    setFieldsScriptActionPositionAction,
} from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { BlockPositionActionPosition, FieldActionPosition } from '../../Store/types/ActionPosition';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { AnimationElementFieldsTimeLines } from '../AnimationElementFieldsTimeLines';
import { TimeLine } from '../TimeLine';
import * as c from './index.pcss';

export type AnimationTimeLinesState = {
    containerWidth: UnitTypes[Unit.pixel];
};

export type AnimationTimeLinesStateProps = {
    animationPosition: ConstructorState['animationPosition'];
    animationElementScript: AnimationElementScript<AnimationElementName> | undefined;
};
export type AnimationTimeLinesDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorState['animationPosition']) => void;
    setBlockPositionScriptActionPosition: (actionPosition: BlockPositionActionPosition) => void;
    setFieldsScriptActionPosition: (actionPosition: FieldActionPosition) => void;
};

export type AnimationTimeLinesProps =
    & AnimationTimeLinesStateProps
    & AnimationTimeLinesDispatchProps;

class AnimationTimeLinesComponent extends React.Component<AnimationTimeLinesProps, AnimationTimeLinesState> {
    private containerElement?: HTMLDivElement | null;
    private resizeSensor?: ResizeSensor;

    constructor(props: AnimationTimeLinesProps) {
        super(props);

        this.state = {
            containerWidth: 0,
        };
    }

    public render() {
        const {
            animationPosition,
            animationElementScript,
            setBlockPositionScriptActionPosition,
            setFieldsScriptActionPosition,
        } = this.props;

        const {
            containerWidth,
        } = this.state;

        return <div
            className={ c.AnimationTimelines }
            ref={ (element) => {
                this.containerElement = element;
            } }
        >
            <TimeLine
                points={ [{
                    position: animationPosition,
                    containerWidth,
                    movable: {
                        min: 0,
                        max: 1,
                    },
                    onPositionChange: this.onPositionChange,
                }] }
            >
                <div className={ c.AnimationTimelines__positionTimeLine }/>
            </TimeLine>
            {
                animationElementScript === undefined
                    ? null
                    : <AnimationElementFieldsTimeLines
                        animationElementScript={ animationElementScript }
                        containerWidth={ containerWidth }
                        setBlockPositionScriptActionPosition={ setBlockPositionScriptActionPosition }
                        setFieldsScriptActionPosition={ setFieldsScriptActionPosition }
                    />
            }
        </div>;
    }

    public componentDidMount() {
        const {
            containerElement,
        } = this;

        if (!containerElement) {
            throw new Error('Container element has not been initialized');
        }

        this.resizeSensor = new ResizeSensor(containerElement, ({ width }) => {
            this.setState({ containerWidth: width });
        });

        this.setState({ containerWidth: this.resizeSensor.getSize().width });
    }

    private onPositionChange = (position: number) => {
        this.props.setAnimationPosition(position);
    }
}

const mapStateToProps = (state: ConstructorState): AnimationTimeLinesStateProps => {
    const {
        animationPosition,
        editParams,
    } = state;

    const animationElementScript = editParams === undefined
        ? undefined
        : getEditedAnimationElementScript(state);

    return {
        animationPosition,
        animationElementScript,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): AnimationTimeLinesDispatchProps => ({
    setAnimationPosition: (animationPosition) => {
        dispatch(setAnimationPositionAction(animationPosition));
    },
    setBlockPositionScriptActionPosition: (actionPosition: BlockPositionActionPosition) => {
        dispatch(setBlockPositionScriptActionPositionAction(actionPosition));
    },
    setFieldsScriptActionPosition: (actionPosition: FieldActionPosition) => {
        dispatch(setFieldsScriptActionPositionAction(actionPosition));
    },
});

export const AnimationTimelines = connect(mapStateToProps, mapDispatchToProps)(AnimationTimeLinesComponent);
