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
    actions,
} from '../../Store/actions';
import { ConstructorStore } from '../../Store/ConstructorStore';
import { AdditionalStep } from '../../Store/types/AdditionalStep';
import { EditableStep } from '../../Store/types/EditableStep';
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
                            isBlockPositionField={ true }
                            fieldsScripts={ animationElementScript.blockScript }
                            titlesDictionary={ BlockFieldTitles }
                            containerWidth={ containerWidth }
                            onScriptStepValueChange={ setBlockScriptStepValue }
                            onScriptStepRemove={ removeBlockScriptStep }
                            onScriptStepAdd={ addBlockScriptStep }
                        />
                        <FieldsTimeLines
                            isBlockPositionField={ false }
                            fieldsScripts={ animationElementScript.fieldsScript }
                            titlesDictionary={ AnimationElementFieldTitles[animationElementScript.elementName] }
                            containerWidth={ containerWidth }
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
        dispatch(actions.setAnimationPosition(animationPosition));
    },
    setBlockScriptStepValue: (stepValue) => {
        dispatch(actions.setBlockScriptStepValue(stepValue));
    },
    setFieldsScriptStepValue: (stepValue) => {
        dispatch(actions.setFieldsScriptStepValue(stepValue));
    },
    removeBlockScriptStep: (changedStep) => {
        dispatch(actions.removeBlockScriptStep(changedStep));
    },
    removeFieldsScriptStep: (changedStep) => {
        dispatch(actions.removeFieldsScriptStep(changedStep));
    },
    addBlockScriptStep: (addedStep) => {
        dispatch(actions.addBlockScriptStep(addedStep));
    },
    addFieldsScriptStep: (addedStep) => {
        dispatch(actions.addFieldsScriptStep(addedStep));
    },
});

export const TimeLines = connect(mapStateToProps, mapDispatchToProps)(TimeLinesComponent);
