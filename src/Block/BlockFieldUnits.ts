import { Unit } from '../Unit/Unit';

export const BlockFieldUnits = {
    x: Unit.percent as Unit.percent,
    y: Unit.percent as Unit.percent,
    height: Unit.percentZeroToInfinity as Unit.percentZeroToInfinity,
    width: Unit.percentZeroToInfinity as Unit.percentZeroToInfinity,
    rotation: Unit.degree as Unit.degree,
    existence: Unit.boolean as Unit.boolean,
};
export type BlockFieldUnits = typeof BlockFieldUnits;
