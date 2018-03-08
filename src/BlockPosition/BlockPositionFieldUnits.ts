import { Unit } from '../Unit/Unit';

export const BlockPositionFieldUnits = {
    x: Unit.percent as Unit.percent,
    y: Unit.percent as Unit.percent,
    height: Unit.percent as Unit.percent,
    width: Unit.percent as Unit.percent,
    rotation: Unit.degree as Unit.degree,
};
export type BlockPositionFieldUnits = typeof BlockPositionFieldUnits;
