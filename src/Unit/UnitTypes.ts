import { Color } from '../types/Color';
import { Unit } from './Unit';

export type UnitTypes = {
    [Unit.degree]: number;
    [Unit.percent]: number;
    [Unit.pixel]: number;
    [Unit.color]: Color;
};
