import { AnimationElements } from '../AnimationElements/AnimationElements';
import { AnimationElementsFieldsUnits } from '../AnimationElements/AnimationElementsFieldsUnits';
import { AnimationScript } from '../AnimationScript';
import { BlockFieldUnits } from '../Block/BlockFieldUnits';
import { BlockLocation } from '../BlockLocation/BlockLocation';
import { DEFAULT_RELATION } from '../Scale/DEFAULT_RELATION';
import { DEFAULT_SCALE_COORDINATES } from '../Scale/DEFAULT_SCALE_COORDINATES';
import { DEFAULT_ZOOM } from '../Scale/DEFAULT_ZOOM';
import { PointCoordinates } from '../types/PointCoordinates';
import { Size } from '../types/Size';
import { Unit } from '../Unit/Unit';

export type ChangingPositionStep<T extends Record<string, Unit>> = {
    isBlockPositionField: T extends BlockFieldUnits ? true : false;
    fieldName: keyof T;
    stepIndex: number;
};

export type ConstructorStore = {
    editParams: {
        isMoving: boolean;
        isResizing: boolean;
        isRotating: boolean;
        // TODO: handle
        changingPositionStep:
            | ChangingPositionStep<BlockFieldUnits | AnimationElementsFieldsUnits[AnimationElements]>
            | undefined;
        blockLocation: BlockLocation;
    } | undefined,
    scaleCoordinates: PointCoordinates;
    relation: Size,
    zoom: number;
    animationScript: AnimationScript;
    animationPosition: number;
};

export const defaultConstructorState: ConstructorStore = {
    editParams: undefined,
    scaleCoordinates: DEFAULT_SCALE_COORDINATES,
    zoom: DEFAULT_ZOOM,
    relation: DEFAULT_RELATION,
    animationScript: [],
    animationPosition: 0,
};
