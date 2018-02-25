import { BlockPositionScript } from '../AnimationScript';
import { Easing } from '../Easing/Easing';
import { mapArrayValuesToObject } from '../utils/mapArrayValuesToObject';
import { ALL_BLOCK_POSITION_FIELD_NAMES } from './ALL_BLOCK_POSITION_FIELD_NAMES';
import { BlockPositionFieldUnits } from './BlockPositionFieldUnits';
import { DEFAULT_BLOCK_POSITION } from './DEFAULT_BLOCK_POSITION';

export const DEFAULT_BLOCK_POSITION_SCRIPT: BlockPositionScript = mapArrayValuesToObject(
    ALL_BLOCK_POSITION_FIELD_NAMES,
    (blockPositionFieldName) => {
        return {
            unit: BlockPositionFieldUnits[blockPositionFieldName],
            actions: [{
                duration: 1,
                value: DEFAULT_BLOCK_POSITION[blockPositionFieldName],
                easingName: Easing.easeInOut,
            }],
        };
    }
);
