import { connect, MapDispatchToPropsFunction, MapStateToPropsFactory } from 'react-redux';
import { AnimationElements } from '../../../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../../../AnimationElements/AnimationElementsFieldsUnits';
import { BlockFieldUnits } from '../../../Block/BlockFieldUnits';
import { actions } from '../../../Store/actions';
import { ConstructorState, StepLocation } from '../../../Store/ConstructorState';
import { makeGetStepPositionSelector } from '../../../Store/selectors/makeGetStepPositionSelector';
import { makeStepChangingPositionSelector } from '../../../Store/selectors/makeStepChangingPositionSelector';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import {
    TimeLinePoint,
    TimeLinePointCallbacks,
    TimeLinePointChangeableParams,
    TimeLinePointMovableParams,
    TimeLinePointParams,
} from './';

export type TimeLinePointStateProps = {
    changingPosition: boolean;
    position: number;
};

export type TimeLinePointOwnProps<T extends Record<string, Unit>, K extends keyof T> = {
    isBlockFieldStep: boolean;
    stepLocation: StepLocation<T>
    containerWidth: UnitTypes[Unit.pixel];
    movable: TimeLinePointMovableParams | undefined;
    changeable: TimeLinePointChangeableParams<T[K]> | undefined;
};

const makeMapStoreToProps: MapStateToPropsFactory<TimeLinePointStateProps, TimeLinePointOwnProps<any, any>, ConstructorState>
    = (initialStore, initialOwnProps) => {
    const stepChangingPositionSelector = makeStepChangingPositionSelector(initialOwnProps);
    const getStepPositionSelector = makeGetStepPositionSelector(initialOwnProps);

    return (state, ownProps): TimeLinePointParams<Record<string, Unit>, string> => {
        const {
            isBlockFieldStep,
            stepLocation,
            containerWidth,
            movable,
            changeable,
        } = ownProps;

        return {
            isBlockFieldStep,
            stepLocation,
            position: getStepPositionSelector(state),
            containerWidth,
            movable,
            changeable,
            changingPosition: stepChangingPositionSelector(state),
        };
    };
};

const mapDispatchToProps: MapDispatchToPropsFunction<TimeLinePointCallbacks, TimeLinePointOwnProps<Record<string, Unit>, string>> =
    (dispatch, ownProps): TimeLinePointCallbacks => {
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
        };
    };

export const TimeLinePointConnected = connect(makeMapStoreToProps, mapDispatchToProps)(TimeLinePoint);
