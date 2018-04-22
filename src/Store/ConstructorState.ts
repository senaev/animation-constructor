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

/**
 * Coordinates of animation `Step` within `AnimationElement` or `Block`
 */
export type StepLocation<T extends Record<string, Unit>> = {
    /**
     * Name of `AnimationElement` or `Block` field that contains `Step`
     */
    fieldName: keyof T;
    /**
     * Index of `Step` in field steps array
     */
    stepIndex: number;
};

/**
 * Params that describe state of editing animation as JSON
 */
export type EditingAsJSONParams = {
    /**
     * Current string in editor
     */
    jsonString: string;
};

/**
 * Application state
 */
export type ConstructorState = {
    /**
     * Params of currently edited `Block` and `AnimationElement` or undefined if no one animation element is changing right now
     */
    editParams: {
        /**
         * If user moves element on `Board` right now
         */
        isMoving: boolean;
        /**
         * If user changes element size on `Board` right now
         */
        isResizing: boolean;
        /**
         * If rotate element on `Board` right now
         */
        isRotating: boolean;
        /**
         * If user changes element field step position in `TimeLine` right now
         */
        blockChangingPositionStepLocation:
            | StepLocation<BlockFieldUnits>
            | undefined;
        /**
         * If user changes block field step position in `TimeLine` right now
         */
        elementFieldChangingPositionStepLocation:
            | StepLocation<AnimationElementsFieldsUnits[AnimationElements]>
            | undefined;
        /**
         * Location of editing animation element
         */
        blockLocation: BlockLocation;
    } | undefined;
    /**
     * `undefined` means that animation is not editing as JSON at the moment
     */
    editingAsJSONParams: EditingAsJSONParams | undefined;
    /**
     * Сoordinates of `Board` center at the screen square
     */
    scaleCoordinates: PointCoordinates;
    /**
     * Relation of edited animation area
     */
    relation: Size;
    /**
     * Current user zoom on `Board`
     */
    zoom: number;
    /**
     * Full animation script
     */
    animationScript: AnimationScript;
    /**
     * Current position of animation that presented on `Board`
     */
    animationPosition: number;
};

export const defaultConstructorState: ConstructorState = {
    editParams: undefined,
    editingAsJSONParams: undefined,
    scaleCoordinates: DEFAULT_SCALE_COORDINATES,
    zoom: DEFAULT_ZOOM,
    relation: DEFAULT_RELATION,
    animationScript: [],
    animationPosition: 0,
};
