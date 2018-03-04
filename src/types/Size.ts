import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';

export type Size = {
    width: UnitTypes[Unit.percent],
    height: UnitTypes[Unit.percent],
};
