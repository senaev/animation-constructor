import { getObjectKeys } from '../utils/getObjectKeys';
import { Unit } from './Unit';

export const AllUnits: Unit[] = getObjectKeys(Unit) as Unit[];
