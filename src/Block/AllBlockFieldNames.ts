import { getObjectKeys } from '../utils/getObjectKeys';
import { BlockFieldName } from './BlockFieldName';
import { BlockFieldUnits } from './BlockFieldUnits';

export const AllBlockFieldNames: BlockFieldName[] = getObjectKeys(BlockFieldUnits);
