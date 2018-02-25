import { Unit } from '../Unit/Unit';
import { UnitName } from '../Unit/UNIT_NAMES';
import { BlockPositionFieldName } from './BlockPositionFieldName';

export const BlockPositionFieldUnits: Record<BlockPositionFieldName, UnitName> = {
    x: Unit.percent,
    y: Unit.percent,
    height: Unit.percent,
    width: Unit.percent,
    rotation: Unit.degree,
};
export type BlockPositionFieldUnits = typeof BlockPositionFieldUnits;
