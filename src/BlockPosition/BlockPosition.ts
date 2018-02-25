import { Unit } from '../UnitName/Unit';
import { UnitTypes } from '../UnitName/UnitTypes';

export type PointCoordinates = {
    x: UnitTypes[Unit.percent],
    y: UnitTypes[Unit.percent],
};

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
