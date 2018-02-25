import { getObjectKeys } from '../utils/getObjectKeys';
import { BlockPositionFieldName } from './BlockPositionFieldName';
import { DEFAULT_BLOCK_POSITION } from './DEFAULT_BLOCK_POSITION';

export const ALL_BLOCK_POSITION_FIELD_NAMES: BlockPositionFieldName[] = getObjectKeys(DEFAULT_BLOCK_POSITION);
