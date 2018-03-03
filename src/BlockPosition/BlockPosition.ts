import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';

// TODO: Coordinates
export type PointCoordinates = {
    x: UnitTypes[Unit.percent],
    y: UnitTypes[Unit.percent],
};

// TODO: Size
export type BlockSize = {
    width: UnitTypes[Unit.percent],
    height: UnitTypes[Unit.percent],
};

type BlockRotation = {
    // TODO: support transformOrigin properties
    rotation: UnitTypes[Unit.degree];
};

export type BlockPosition =
    & PointCoordinates
    & BlockSize
    & BlockRotation;
