import { UnitName } from './UNIT_NAMES';
import { UnitTypes } from './UnitTypes';

// TODO: remove
export type UnitNamesObjectToUnitsObject<T extends Record<string, UnitName>> = Record<keyof T, UnitTypes[T[keyof T]]>;
