import { Slider } from 'material-ui';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AnimationElementFieldTitles } from '../../AnimationElements/AnimationElementFieldTitles';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
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
import { ConstructorStore } from '../../Store/State';
import { AdditionalStep } from '../../Store/types/AdditionalStep';
import { EditableStep } from '../../Store/types/EditableStep';
import { EditableStepPosition } from '../../Store/types/EditableStepPosition';
import { EditableStepValue } from '../../Store/types/EditableStepValue';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { noop } from '../../utils/noop';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { FieldsTimeLines } from './FieldsTimeLines';
import * as c from './index.pcss';

export type TimeLinesState = {
    containerWidth: UnitTypes[Unit.pixel];
};

export type TimeLinesStateProps = {
    animationPosition: ConstructorStore['animationPosition'];
    animationElementScript: AnimationElementScript<AnimationElements> | undefined;
};
export type TimeLinesDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorStore['animationPosition']) => void;
    setBlockScriptStepPosition: (stepPosition: EditableStepPosition<BlockFieldUnits>) => void;
    setFieldsScriptStepPosition: (stepPosition: EditableStepPosition<AnimationElementsFieldsUnits[AnimationElements]>) => void;
    setBlockScriptStepValue: (stepValue: EditableStepValue<BlockFieldUnits>) => void;
    setFieldsScriptStepValue: (stepValue: EditableStepValue<AnimationElementsFieldsUnits[AnimationElements]>) => void;
    removeBlockScriptStep: (changedStep: EditableStep<BlockFieldUnits>) => void;
    removeFieldsScriptStep: (changedStep: EditableStep<AnimationElementsFieldsUnits[AnimationElements]>) => void;
    addBlockScriptStep: (changedStep: AdditionalStep<BlockFieldUnits>) => void;
    addFieldsScriptStep: (changedStep: AdditionalStep<AnimationElementsFieldsUnits[AnimationElements]>) => void;
};

export type TimeLinesProps =
    & TimeLinesStateProps
    & TimeLinesDispatchProps;

const AMIMATION_POSITION_TITLE = 'Позиция анимации';

class TimeLinesComponent extends React.Component<TimeLinesProps, TimeLinesState> {
    private sliderContainerElement?: HTMLDivElement | null;
    private resizeSensor?: ResizeSensor;

    constructor(props: TimeLinesProps) {
        super(props);

        this.state = {
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
            containerWidth,
        } = this.state;

        return <div className={ c.TimeLines }>
            <div className={ c.TimeLines__row }>
                <span
                    title={ AMIMATION_POSITION_TITLE }
                    className={ c.TimeLines__row__title }
                >
                    { AMIMATION_POSITION_TITLE }
                </span>
                <div
                    className={ c.TimeLines__row__timeline }
                    ref={ (element) => {
                        this.sliderContainerElement = element;
                    } }
                >
                    <Slider
                        value={ animationPosition }
                        onChange={ this.onPositionChange }
                        onDragStart={ noop }
                        onDragStop={ noop }
                        step={ 0.0001 }
                        sliderStyle={ {
                            marginTop: '0',
                            marginBottom: '0',
                        } }
                    />
                </div>
            </div>
            {
                animationElementScript === undefined
                    ? null
                    : <>
                        <FieldsTimeLines
                            fieldsScripts={ animationElementScript.blockScript }
                            titlesDictionary={ BlockFieldTitles }
                            containerWidth={ containerWidth }
                            onScriptStepPositionChange={ setBlockScriptStepPosition }
                            onScriptStepValueChange={ setBlockScriptStepValue }
                            onScriptStepRemove={ removeBlockScriptStep }
                            onScriptStepAdd={ addBlockScriptStep }
                        />
                        <FieldsTimeLines
                            fieldsScripts={ animationElementScript.fieldsScript }
                            titlesDictionary={ AnimationElementFieldTitles[animationElementScript.elementName] }
                            containerWidth={ containerWidth }
                            onScriptStepPositionChange={ setFieldsScriptStepPosition }
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
            sliderContainerElement,
        } = this;

        if (!sliderContainerElement) {
            throw new Error('Container element has not been initialized');
        }

        this.resizeSensor = new ResizeSensor(sliderContainerElement, ({ width }) => {
            this.setState({ containerWidth: width });
        });

        this.setState({ containerWidth: this.resizeSensor.getSize().width });
    }

    private onPositionChange = (event: any, position: number) => {
        this.props.setAnimationPosition(position);
    }
}

const mapStateToProps = (state: ConstructorStore): TimeLinesStateProps => {
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
