import { UnitName } from '../UnitName/UNIT_NAMES';
import { UnitTypes } from '../UnitName/UnitTypes';

export type UnitTransitionFunction<T extends UnitName> = (position: number,
                                                          startValue: UnitTypes[T],
                                                          endValue: UnitTypes[T]) => UnitTypes[T];
