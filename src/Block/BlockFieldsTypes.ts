import { UnitTypes } from '../Unit/UnitTypes';
import { BlockFieldName } from './BlockFieldName';
import { BlockFieldUnits } from './BlockFieldUnits';

export type BlockFieldsTypes = UnitTypes[BlockFieldUnits[BlockFieldName]];
