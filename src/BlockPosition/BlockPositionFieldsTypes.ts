import { UnitTypes } from '../Unit/UnitTypes';
import { BlockPositionFieldName } from './BlockPositionFieldName';
import { BlockPositionFieldUnits } from './BlockPositionFieldUnits';

export type BlockPositionFieldsTypes = UnitTypes[BlockPositionFieldUnits[BlockPositionFieldName]];
