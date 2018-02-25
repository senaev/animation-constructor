import { getObjectKeys } from '../utils/getObjectKeys';
import { BlockPositionFieldName } from './BlockPositionFieldName';
import { BlockPositionFieldUnits } from './BlockPositionFieldUnits';

export const ALL_BLOCK_POSITION_FIELD_NAMES: BlockPositionFieldName[] = getObjectKeys(BlockPositionFieldUnits);
