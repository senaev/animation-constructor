import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AnimationElementFieldTitles } from '../../AnimationElements/AnimationElementFieldTitles';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { AnimationElementScript } from '../../AnimationScript';
import { BlockFieldTitles } from '../../Block/BlockFieldTitles';
import { BlockFieldUnits } from '../../Block/BlockFieldUnits';
import {
    setAnimationPositionAction,
    setBlockScriptActionPositionAction,
    setBlockScriptActionValueAction,
    setFieldsScriptActionPositionAction,
    setFieldsScriptActionValueAction,
} from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { ActionPosition } from '../../Store/types/ActionPosition';
import { ActionValue } from '../../Store/types/ActionValue';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { FieldsTimeLines } from './FieldsTimeLines';
import * as c from './index.pcss';
import { TimeLine } from './TimeLine';

export type TimeLinesState = {
    isChangingActionPosition: boolean;
    containerWidth: UnitTypes[Unit.pixel];
};

export type TimeLinesStateProps = {
    animationPosition: ConstructorState['animationPosition'];
    animationElementScript: AnimationElementScript<AnimationElementName> | undefined;
};
export type TimeLinesDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorState['animationPosition']) => void;
    setBlockScriptActionPosition: (actionPosition: ActionPosition<BlockFieldUnits>) => void;
    setFieldsScriptActionPosition: (actionPosition: ActionPosition<AnimationElementsFieldsUnits[AnimationElementName]>) => void;
    setBlockScriptActionValue: (actionValue: ActionValue<BlockFieldUnits>) => void
    setFieldsScriptActionValue: (actionValue: ActionValue<AnimationElementsFieldsUnits[AnimationElementName]>) => void
};

export type TimeLinesProps =
    & TimeLinesStateProps
    & TimeLinesDispatchProps;

class TimeLinesComponent extends React.Component<TimeLinesProps, TimeLinesState> {
    private containerElement?: HTMLDivElement | null;
    private resizeSensor?: ResizeSensor;

    constructor(props: TimeLinesProps) {
        super(props);

        this.state = {
            isChangingActionPosition: false,
            containerWidth: 0,
        };
    }

    public render() {
        const {
            animationPosition,
            animationElementScript,
            setBlockScriptActionPosition,
            setFieldsScriptActionPosition,
            setBlockScriptActionValue,
            setFieldsScriptActionValue,
        } = this.props;

        const {
            isChangingActionPosition,
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
                    onPositionChangeStart: this.onScriptActionPositionChangeStart,
                    onPositionChange: this.onPositionChange,
                    onPositionChangeEnd: this.onScriptActionPositionChangeEnd,
                }] }
            >
                <div className={ c.AnimationTimelines__positionTimeLine }/>
            </TimeLine>
            {
                animationElementScript === undefined
                    ? null
                    : <>
                        <FieldsTimeLines
                            isChangingActionPosition={ isChangingActionPosition }
                            fieldsScripts={ animationElementScript.blockScript }
                            titlesDictionary={ BlockFieldTitles }
                            containerWidth={ containerWidth }
                            onScriptActionPositionChangeStart={ this.onScriptActionPositionChangeStart }
                            onScriptActionPositionChange={ setBlockScriptActionPosition }
                            onScriptActionPositionChangeEnd={ this.onScriptActionPositionChangeEnd }
                            onScriptActionValueChange={ setBlockScriptActionValue }
                        />
                        <FieldsTimeLines
                            isChangingActionPosition={ isChangingActionPosition }
                            fieldsScripts={ animationElementScript.fieldsScript }
                            titlesDictionary={ AnimationElementFieldTitles[animationElementScript.elementName] }
                            containerWidth={ containerWidth }
                            onScriptActionPositionChangeStart={ this.onScriptActionPositionChangeStart }
                            onScriptActionPositionChange={ setFieldsScriptActionPosition }
                            onScriptActionPositionChangeEnd={ this.onScriptActionPositionChangeEnd }
                            onScriptActionValueChange={ setFieldsScriptActionValue }
                        />
                    </>
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

    private onScriptActionPositionChangeStart = () => {
        this.setState({ isChangingActionPosition: true });
    }

    private onScriptActionPositionChangeEnd = () => {
        this.setState({ isChangingActionPosition: false });
    }
}

const mapStateToProps = (state: ConstructorState): TimeLinesStateProps => {
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

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): TimeLinesDispatchProps => ({
    setAnimationPosition: (animationPosition) => {
        dispatch(setAnimationPositionAction(animationPosition));
    },
    setBlockScriptActionPosition: (actionPosition: ActionPosition<BlockFieldUnits>) => {
        dispatch(setBlockScriptActionPositionAction(actionPosition));
    },
    setFieldsScriptActionPosition: (actionPosition: ActionPosition<AnimationElementsFieldsUnits[AnimationElementName]>) => {
        dispatch(setFieldsScriptActionPositionAction(actionPosition));
    },
    setBlockScriptActionValue: (actionValue: ActionValue<BlockFieldUnits>) => {
        dispatch(setBlockScriptActionValueAction(actionValue));
    },
    setFieldsScriptActionValue: (actionValue: ActionValue<AnimationElementsFieldsUnits[AnimationElementName]>) => {
        dispatch(setFieldsScriptActionValueAction(actionValue));
    },
});

export const TimeLines = connect(mapStateToProps, mapDispatchToProps)(TimeLinesComponent);
