import { BlockPositionFieldsScript } from '../AnimationScript';
import { createDefaultUnitScript } from '../Store/utils/createDefaultUnitScript';
import { mapArrayValuesToObject } from '../utils/mapArrayValuesToObject';
import { ALL_BLOCK_POSITION_FIELD_NAMES } from './ALL_BLOCK_POSITION_FIELD_NAMES';
import { BlockPositionFieldUnits } from './BlockPositionFieldUnits';
import { DEFAULT_BLOCK_POSITION } from './DEFAULT_BLOCK_POSITION';

export const DEFAULT_BLOCK_POSITION_SCRIPT: BlockPositionFieldsScript = mapArrayValuesToObject(
    ALL_BLOCK_POSITION_FIELD_NAMES,
    (blockPositionFieldName) => {
        return createDefaultUnitScript(
            BlockPositionFieldUnits[blockPositionFieldName] as any,
            DEFAULT_BLOCK_POSITION[blockPositionFieldName],
        );
    },
);
