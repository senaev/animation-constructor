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
import { actions, } from '../../Store/actions';
import { ConstructorState } from '../../Store/ConstructorState';
import { AdditionalStep } from '../../Store/types/AdditionalStep';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { UnitTypes } from '../../Unit/UnitTypes';
import { noop } from '../../utils/noop';
import { ResizeSensor } from '../../utils/ResizeSensor';
import { FieldsTimeLines } from './FieldsTimeLines';
import * as c from './index.pcss';
import { TimeLinePoint } from './TimeLinePoint';

export type TimeLinesState = {
    containerWidth: UnitTypes['pixel'];
};

export type TimeLinesStateProps = {
    animationPosition: ConstructorState['animationPosition'];
    animationElementScript: AnimationElementScript<AnimationElements> | undefined;
};
export type TimeLinesDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorState['animationPosition']) => void;
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
                    <TimeLinePoint
                        position={ animationPosition }
                        changingPosition={ false }
                        containerWidth={ containerWidth }
                        movable={ {
                            min: 0,
                            max: 1,
                        } }
                        unit={ 'percent'}
                        value={ 0 }
                        onPositionChangeStart={ noop }
                        onPositionChangeEnd={ noop }
                        onPositionChange={ this.onPositionChange }
                        onRemove={ undefined }
                        onChangeValue={ undefined }
                        easing={ undefined }
                        onChangeEasing={ noop }
                    />
                </div>
            </div>
            {
                animationElementScript === undefined
                    ? null
                    : <>
                        <FieldsTimeLines
                            isBlockField={ true }
                            fieldsScripts={ animationElementScript.blockScript }
                            titlesDictionary={ BlockFieldTitles }
                            containerWidth={ containerWidth }
                            onScriptStepAdd={ addBlockScriptStep }
                        />
                        <FieldsTimeLines
                            isBlockField={ false }
                            fieldsScripts={ animationElementScript.fieldsScript }
                            titlesDictionary={ AnimationElementFieldTitles[animationElementScript.elementName] }
                            containerWidth={ containerWidth }
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

    private onPositionChange = (position: number) => {
        this.props.setAnimationPosition(position);
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
        dispatch(actions.setAnimationPosition(animationPosition));
    },
    addBlockScriptStep: (addedStep) => {
        dispatch(actions.addBlockScriptStep(addedStep));
    },
    addFieldsScriptStep: (addedStep) => {
        dispatch(actions.addFieldsScriptStep(addedStep));
    },
});

export const TimeLines = connect(mapStateToProps, mapDispatchToProps)(TimeLinesComponent);
