import { PointCoordinates } from '../types/PointCoordinates';
import { Size } from '../types/Size';
import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';

type BlockRotation = {
    // TODO: support transformOrigin properties
    rotation: UnitTypes[Unit.degree];
};

export type BlockPosition =
    & PointCoordinates
    & Size
    & BlockRotation;
