import { UnitTypes } from '../Unit/UnitTypes';
import { BlockFieldUnits } from './BlockFieldUnits';

export const DefaultBlock: {
    [key in keyof BlockFieldUnits]: UnitTypes[BlockFieldUnits[key]];
} = {
    x: 10,
    y: 10,
    height: 25,
    width: 25,
    rotation: 0,
    existence: true,
};
