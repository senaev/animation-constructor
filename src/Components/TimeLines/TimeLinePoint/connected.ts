import { connect, MapDispatchToPropsFunction, MapStateToPropsFactory } from 'react-redux';
import { AnimationElements } from '../../../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../../../AnimationElements/AnimationElementsFieldsUnits';
import { BlockFieldUnits } from '../../../Block/BlockFieldUnits';
import { actions } from '../../../Store/actions';
import { ConstructorState, StepLocation } from '../../../Store/ConstructorState';
import { makeStepChangingPositionSelector } from '../../../Store/selectors/makeStepChangingPositionSelector';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import {
    TimeLinePoint,
    TimeLinePointCallbacks,
    TimeLinePointChangeableParams,
    TimeLinePointMovableParams,
    TimeLinePointRemovableParams,
} from './';

export type TimeLinePointStateProps = {
    changingPosition: boolean;
};

export type TimeLinePointOwnProps<T extends Record<string, Unit>, K extends keyof T> = {
    isBlockFieldStep: boolean;
    stepLocation: StepLocation<T>
    position: number;
    containerWidth: UnitTypes[Unit.pixel];
    removable: TimeLinePointRemovableParams | undefined;
    movable: TimeLinePointMovableParams | undefined;
    changeable: TimeLinePointChangeableParams<T[K]> | undefined;
};

export type TimeLinePointMappedProps<T extends Record<string, Unit>, K extends keyof T> =
    & TimeLinePointStateProps
    & TimeLinePointOwnProps<T, K>;

const makeMapStoreToProps: MapStateToPropsFactory<TimeLinePointStateProps, TimeLinePointOwnProps<any, any>, ConstructorState>
    = (initialStore, initialOwnProps) => {
    const stepChangingPositionSelector = makeStepChangingPositionSelector(initialOwnProps);

    return (store, ownProps): TimeLinePointMappedProps<Record<string, Unit>, string> => {
        const {
            isBlockFieldStep,
            stepLocation,
            position,
            containerWidth,
            removable,
            movable,
            changeable,
        } = ownProps;

        return {
            isBlockFieldStep,
            stepLocation,
            position,
            containerWidth,
            removable,
            movable,
            changeable,
            changingPosition: stepChangingPositionSelector(store),
        };
    };
};

const mapDispatchToProps: MapDispatchToPropsFunction<TimeLinePointCallbacks, TimeLinePointOwnProps<Record<string, Unit>, string>> =
    (dispatch, ownProps): TimeLinePointCallbacks => {
        const {
            isBlockFieldStep,
            stepLocation,
        } = ownProps;

        return {
            onPositionChangeStart: () => {
                if (isBlockFieldStep) {
                    dispatch(actions.setBlockChangingPositionStepLocation(
                        stepLocation as StepLocation<BlockFieldUnits>
                    ));
                } else {
                    dispatch(actions.setElementFieldsChangingPositionStepLocation(
                        stepLocation as StepLocation<AnimationElementsFieldsUnits[AnimationElements]>
                    ));
                }
            },
            onPositionChange: (stepPosition) => {
                if (isBlockFieldStep) {
                    dispatch(actions.setBlockScriptStepPosition({
                        ...stepLocation as StepLocation<BlockFieldUnits>,
                        position: stepPosition,
                    }));
                } else {
                    dispatch(actions.setFieldsScriptStepPosition({
                        ...stepLocation as StepLocation<AnimationElementsFieldsUnits[AnimationElements]>,
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
        };
    };

export const TimeLinePointConnected = connect(makeMapStoreToProps, mapDispatchToProps)(TimeLinePoint);
