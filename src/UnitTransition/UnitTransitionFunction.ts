import { UnitName } from '../Unit/UNIT_NAMES';
import { UnitTypes } from '../Unit/UnitTypes';

export type UnitTransitionFunction<T extends UnitName> = (position: number,
                                                          startValue: UnitTypes[T],
                                                          endValue: UnitTypes[T]) => UnitTypes[T];
