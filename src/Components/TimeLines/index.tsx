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
    addBlockScriptStepAction,
    addFieldsScriptStepAction,
    removeBlockScriptStepAction,
    removeFieldsScriptStepAction,
    setAnimationPositionAction,
    setBlockScriptStepPositionAction,
    setBlockScriptStepValueAction,
    setFieldsScriptStepPositionAction,
    setFieldsScriptStepValueAction,
} from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { AdditionalStep } from '../../Store/types/AdditionalStep';
import { EditableStep } from '../../Store/types/EditableStep';
import { EditableStepPosition } from '../../Store/types/EditableStepPosition';
import { EditableStepValue } from '../../Store/types/EditableStepValue';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { FieldsTimeLines } from './FieldsTimeLines';
import * as c from './index.pcss';
import { TimeLine } from './TimeLine';

export type TimeLinesState = {
    isChangingStepPosition: boolean;
    containerWidth: UnitTypes[Unit.pixel];
};

export type TimeLinesStateProps = {
    animationPosition: ConstructorState['animationPosition'];
    animationElementScript: AnimationElementScript<AnimationElementName> | undefined;
};
export type TimeLinesDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorState['animationPosition']) => void;
    setBlockScriptStepPosition: (stepPosition: EditableStepPosition<BlockFieldUnits>) => void;
    setFieldsScriptStepPosition: (stepPosition: EditableStepPosition<AnimationElementsFieldsUnits[AnimationElementName]>) => void;
    setBlockScriptStepValue: (stepValue: EditableStepValue<BlockFieldUnits>) => void
    setFieldsScriptStepValue: (stepValue: EditableStepValue<AnimationElementsFieldsUnits[AnimationElementName]>) => void
    removeBlockScriptStep: (changedStep: EditableStep<BlockFieldUnits>) => void;
    removeFieldsScriptStep: (changedStep: EditableStep<AnimationElementsFieldsUnits[AnimationElementName]>) => void;
    addBlockScriptStep: (changedStep: AdditionalStep<BlockFieldUnits>) => void;
    addFieldsScriptStep: (changedStep: AdditionalStep<AnimationElementsFieldsUnits[AnimationElementName]>) => void;
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
            isChangingStepPosition: false,
            containerWidth: 0,
        };
    }

    public render() {
        const {
            animationPosition,
            animationElementScript,
            setBlockScriptStepPosition,
            setFieldsScriptStepPosition,
            setBlockScriptStepValue,
            setFieldsScriptStepValue,
            removeBlockScriptStep,
            removeFieldsScriptStep,
            addBlockScriptStep,
            addFieldsScriptStep,
        } = this.props;

        const {
            isChangingStepPosition,
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
                    onPositionChangeStart: this.onScriptStepPositionChangeStart,
                    onPositionChange: this.onPositionChange,
                    onPositionChangeEnd: this.onScriptStepPositionChangeEnd,
                }] }
            >
                <div className={ c.AnimationTimelines__positionTimeLine }/>
            </TimeLine>
            {
                animationElementScript === undefined
                    ? null
                    : <>
                        <FieldsTimeLines
                            isChangingStepPosition={ isChangingStepPosition }
                            fieldsScripts={ animationElementScript.blockScript }
                            titlesDictionary={ BlockFieldTitles }
                            containerWidth={ containerWidth }
                            onScriptStepPositionChangeStart={ this.onScriptStepPositionChangeStart }
                            onScriptStepPositionChange={ setBlockScriptStepPosition }
                            onScriptStepPositionChangeEnd={ this.onScriptStepPositionChangeEnd }
                            onScriptStepValueChange={ setBlockScriptStepValue }
                            onScriptStepRemove={ removeBlockScriptStep }
                            onScriptStepAdd={ addBlockScriptStep }
                        />
                        <FieldsTimeLines
                            isChangingStepPosition={ isChangingStepPosition }
                            fieldsScripts={ animationElementScript.fieldsScript }
                            titlesDictionary={ AnimationElementFieldTitles[animationElementScript.elementName] }
                            containerWidth={ containerWidth }
                            onScriptStepPositionChangeStart={ this.onScriptStepPositionChangeStart }
                            onScriptStepPositionChange={ setFieldsScriptStepPosition }
                            onScriptStepPositionChangeEnd={ this.onScriptStepPositionChangeEnd }
                            onScriptStepValueChange={ setFieldsScriptStepValue }
                            onScriptStepRemove={ removeFieldsScriptStep }
                            onScriptStepAdd={ addFieldsScriptStep }
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

    private onScriptStepPositionChangeStart = () => {
        this.setState({ isChangingStepPosition: true });
    }

    private onScriptStepPositionChangeEnd = () => {
        this.setState({ isChangingStepPosition: false });
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
    setBlockScriptStepPosition: (stepPosition) => {
        dispatch(setBlockScriptStepPositionAction(stepPosition));
    },
    setFieldsScriptStepPosition: (stepPosition) => {
        dispatch(setFieldsScriptStepPositionAction(stepPosition));
    },
    setBlockScriptStepValue: (stepValue) => {
        dispatch(setBlockScriptStepValueAction(stepValue));
    },
    setFieldsScriptStepValue: (stepValue) => {
        dispatch(setFieldsScriptStepValueAction(stepValue));
    },
    removeBlockScriptStep: (changedStep) => {
        dispatch(removeBlockScriptStepAction(changedStep));
    },
    removeFieldsScriptStep: (changedStep) => {
        dispatch(removeFieldsScriptStepAction(changedStep));
    },
    addBlockScriptStep: (addedStep) => {
        dispatch(addBlockScriptStepAction(addedStep));
    },
    addFieldsScriptStep: (addedStep) => {
        dispatch(addFieldsScriptStepAction(addedStep));

    },
});

export const TimeLines = connect(mapStateToProps, mapDispatchToProps)(TimeLinesComponent);
