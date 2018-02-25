import { ALL_FIELDS } from '../Fields/ALL_FIELDS';
import { UnitName } from '../UnitName/UNIT_NAMES';
import { mapArrayValuesToObject } from '../utils/mapArrayValuesToObject';
import { ALL_BLOCK_POSITION_FIELD_NAMES } from './ALL_BLOCK_POSITION_FIELD_NAMES';
import { BlockPositionFieldName } from './BlockPositionFieldName';
import { BlockPositionFielsTypes } from './BlockPositionFielsTypes';

export const BlockPositionFieldUnits: Record<BlockPositionFieldName, UnitName> = mapArrayValuesToObject(
    ALL_BLOCK_POSITION_FIELD_NAMES,
    (blockPositionFieldName) => {
        const fieldType = BlockPositionFielsTypes[blockPositionFieldName];

        return ALL_FIELDS[fieldType].unit;
    },
);

export type BlockPositionFieldUnits = typeof BlockPositionFieldUnits;
