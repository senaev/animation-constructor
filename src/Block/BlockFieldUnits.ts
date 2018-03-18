import { Unit } from '../Unit/Unit';

export const BlockFieldUnits = {
    x: Unit.percent as Unit.percent,
    y: Unit.percent as Unit.percent,
    height: Unit.percent as Unit.percent,
    width: Unit.percent as Unit.percent,
    rotation: Unit.degree as Unit.degree,
    existence: Unit.boolean as Unit.boolean,
};
export type BlockFieldUnits = typeof BlockFieldUnits;
