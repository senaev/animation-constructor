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
    addBlockScriptActionAction,
    addFieldsScriptActionAction,
    removeBlockScriptActionAction,
    removeFieldsScriptActionAction,
    setAnimationPositionAction,
    setBlockScriptActionPositionAction,
    setBlockScriptActionValueAction,
    setFieldsScriptActionPositionAction,
    setFieldsScriptActionValueAction,
} from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { AddedAction } from '../../Store/types/AddedAction';
import { ChangedAction } from '../../Store/types/ChangedAction';
import { ChangedActionPosition } from '../../Store/types/ChangedActionPosition';
import { ChangedActionValue } from '../../Store/types/ChangedActionValue';
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
    setBlockScriptActionPosition: (actionPosition: ChangedActionPosition<BlockFieldUnits>) => void;
    setFieldsScriptActionPosition: (actionPosition: ChangedActionPosition<AnimationElementsFieldsUnits[AnimationElementName]>) => void;
    setBlockScriptActionValue: (actionValue: ChangedActionValue<BlockFieldUnits>) => void
    setFieldsScriptActionValue: (actionValue: ChangedActionValue<AnimationElementsFieldsUnits[AnimationElementName]>) => void
    removeBlockScriptAction: (changedAction: ChangedAction<BlockFieldUnits>) => void;
    removeFieldsScriptAction: (changedAction: ChangedAction<AnimationElementsFieldsUnits[AnimationElementName]>) => void;
    addBlockScriptAction: (changedAction: AddedAction<BlockFieldUnits>) => void;
    addFieldsScriptAction: (changedAction: AddedAction<AnimationElementsFieldsUnits[AnimationElementName]>) => void;
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
            removeBlockScriptAction,
            removeFieldsScriptAction,
            addBlockScriptAction,
            addFieldsScriptAction,
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
                    removable: undefined,
                    changeable: undefined,
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
                            onScriptActionRemove={ removeBlockScriptAction }
                            onScriptActionAdd={ addBlockScriptAction }
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
                            onScriptActionRemove={ removeFieldsScriptAction }
                            onScriptActionAdd={ addFieldsScriptAction }
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
    setBlockScriptActionPosition: (actionPosition) => {
        dispatch(setBlockScriptActionPositionAction(actionPosition));
    },
    setFieldsScriptActionPosition: (actionPosition) => {
        dispatch(setFieldsScriptActionPositionAction(actionPosition));
    },
    setBlockScriptActionValue: (actionValue) => {
        dispatch(setBlockScriptActionValueAction(actionValue));
    },
    setFieldsScriptActionValue: (actionValue) => {
        dispatch(setFieldsScriptActionValueAction(actionValue));
    },
    removeBlockScriptAction: (changedAction) => {
        dispatch(removeBlockScriptActionAction(changedAction));
    },
    removeFieldsScriptAction: (changedAction) => {
        dispatch(removeFieldsScriptActionAction(changedAction));
    },
    addBlockScriptAction: (addedAction) => {
        dispatch(addBlockScriptActionAction(addedAction));
    },
    addFieldsScriptAction: (addedAction) => {
        dispatch(addFieldsScriptActionAction(addedAction));

    },
});

export const TimeLines = connect(mapStateToProps, mapDispatchToProps)(TimeLinesComponent);
