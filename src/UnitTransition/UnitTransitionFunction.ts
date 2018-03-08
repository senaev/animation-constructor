import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';

export type UnitTransitionFunction<T extends Unit> = (position: number,
                                                      startValue: UnitTypes[T],
                                                      endValue: UnitTypes[T]) => UnitTypes[T];
