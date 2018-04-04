import { connect, MapDispatchToPropsFunction, MapStateToPropsFactory } from 'react-redux';
import { ConstructorStore, StepLocation } from '../../../Store/ConstructorStore';
import { makeStepChangingPositionSelector } from '../../../Store/selectors/makeStepChangingPositionSelector';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import {
    TimeLinePoint,
    TimeLinePointChangeableParams,
    TimeLinePointMovableParams,
    TimeLinePointRemovableParams,
} from './index';

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

export type TimeLinePointDispatchProps = {
    // TODO
};

export type TimeLinePointMappedProps<T extends Record<string, Unit>, K extends keyof T> =
    & TimeLinePointStateProps
    & TimeLinePointOwnProps<T, K>;

const makeMapStoreToProps: MapStateToPropsFactory<TimeLinePointStateProps, TimeLinePointOwnProps<any, any>, ConstructorStore>
    = (initialStore, initialOwnProps) => {
    const stepChangingPositionSelector = makeStepChangingPositionSelector(initialOwnProps.stepLocation);

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

const mapDispatchToProps: MapDispatchToPropsFunction<TimeLinePointDispatchProps, TimeLinePointOwnProps<Record<string, Unit>, string>> =
    (dispatch, ownProps) => ({
        // TODO
    });

export const TimeLinePointConnected = connect(makeMapStoreToProps, mapDispatchToProps)(TimeLinePoint);
