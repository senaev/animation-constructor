import { connect, MapDispatchToPropsFunction, MapStateToPropsFactory } from 'react-redux';
import { AnimationElements } from '../../../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../../../AnimationElements/AnimationElementsFieldsUnits';
import { BlockFieldUnits } from '../../../Block/BlockFieldUnits';
import { Easing } from '../../../Easing/Easing';
import { actions } from '../../../Store/actions';
import { ConstructorState, StepLocation } from '../../../Store/ConstructorState';
import { makeGetStepMovableSelector } from '../../../Store/selectors/makeGetStepMovableSelector';
import { makeGetStepPositionSelector } from '../../../Store/selectors/makeGetStepPositionSelector';
import { makeGetStepSelector } from '../../../Store/selectors/makeGetStepSelector';
import { makeGetStepTitleSelector } from '../../../Store/selectors/makeGetStepTitleSelector';
import { makeGetStepUnitSelector } from '../../../Store/selectors/makeGetStepUnitSelector';
import { makeStepChangingPositionSelector } from '../../../Store/selectors/makeStepChangingPositionSelector';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { TimeLinePoint, TimeLinePointCallbacks, TimeLinePointMovableParams, TimeLinePointParams, } from './';

export type TimeLinePointConnectedStateProps<T extends Record<string, Unit>> = {
    changingPosition: boolean;
    position: number;
    movable: TimeLinePointMovableParams | undefined;
    unit: T;
    title: string;
    value: UnitTypes[T[keyof T]];
    easing: Easing | undefined;
};

export type TimeLinePointConnectedOwnProps<T extends Record<string, Unit>> = {
    isBlockFieldStep: boolean;
    stepLocation: StepLocation<T>;
    containerWidth: UnitTypes[Unit.pixel];
};

const makeMapStoreToProps: MapStateToPropsFactory<TimeLinePointConnectedStateProps<any>,
    TimeLinePointConnectedOwnProps<any>, ConstructorState>
    = (initialStore, initialOwnProps) => {
    const stepChangingPositionSelector = makeStepChangingPositionSelector(initialOwnProps);
    const getStepPositionSelector = makeGetStepPositionSelector(initialOwnProps);
    const getStepMovableSelector = makeGetStepMovableSelector(initialOwnProps);
    const getStepUnitSelector = makeGetStepUnitSelector(initialOwnProps);
    const getStepTitleSelector = makeGetStepTitleSelector(initialOwnProps);
    const getStepSelector = makeGetStepSelector(initialOwnProps);

    return (state, ownProps): TimeLinePointParams<Record<string, Unit>, string> => {
        const {
            containerWidth,
        } = ownProps;

        const {
            value,
            easing,
        } = getStepSelector(state);

        return {
            containerWidth,
            position: getStepPositionSelector(state),
            movable: getStepMovableSelector(state),
            changingPosition: stepChangingPositionSelector(state),
            unit: getStepUnitSelector(state),
            title: getStepTitleSelector(state),
            value,
            easing,
        };
    };
};

const mapDispatchToProps: MapDispatchToPropsFunction<TimeLinePointCallbacks<Record<string, Unit>, string>,
    TimeLinePointConnectedOwnProps<Record<string, Unit>>> =
    (dispatch, ownProps): TimeLinePointCallbacks<Record<string, Unit>, string> => {
        const {
            isBlockFieldStep,
            stepLocation,
        } = ownProps;

        const blockFieldStepLocation = stepLocation as StepLocation<BlockFieldUnits>;
        const elementFieldStepLocation = stepLocation as StepLocation<AnimationElementsFieldsUnits[AnimationElements]>;

        const removeAction = isBlockFieldStep
            ? actions.removeBlockScriptStep(blockFieldStepLocation)
            : actions.removeFieldsScriptStep(elementFieldStepLocation);

        const onRemove = stepLocation.stepIndex === 0
            ? undefined
            : () => dispatch(removeAction);

        return {
            onPositionChangeStart: () => {
                if (isBlockFieldStep) {
                    dispatch(actions.setBlockChangingPositionStepLocation(blockFieldStepLocation));
                } else {
                    dispatch(actions.setElementFieldsChangingPositionStepLocation(elementFieldStepLocation));
                }
            },
            onPositionChange: (stepPosition) => {
                if (isBlockFieldStep) {
                    dispatch(actions.setBlockScriptStepPosition({
                        ...blockFieldStepLocation,
                        position: stepPosition,
                    }));
                } else {
                    dispatch(actions.setFieldsScriptStepPosition({
                        ...elementFieldStepLocation,
                        position: stepPosition,
                    }));
                }
            },
            onPositionChangeEnd: () => {
                if (isBlockFieldStep) {
                    dispatch(actions.setBlockChangingPositionStepLocation(undefined));
                } else {
                    dispatch(actions.setElementFieldsChangingPositionStepLocation(undefined));
                }
            },
            onRemove,
            onChangeValue: (nextValue) => {
                if (isBlockFieldStep) {
                    dispatch(actions.setBlockScriptStepValue({
                        ...blockFieldStepLocation,
                        value: nextValue as any,
                    }));
                } else {
                    dispatch(actions.setFieldsScriptStepValue({
                        ...elementFieldStepLocation,
                        value: nextValue as any,
                    }));
                }
            },
            onChangeEasing: (easing) => {
                if (isBlockFieldStep) {
                    dispatch(actions.setBlockScriptStepEasing({
                        ...blockFieldStepLocation,
                        easing,
                    }));
                } else {
                    dispatch(actions.setFieldsScriptStepEasing({
                        ...elementFieldStepLocation,
                        easing,
                    }));
                }
            },
        };
    };

export const TimeLinePointConnected = connect(makeMapStoreToProps, mapDispatchToProps)(TimeLinePoint);
