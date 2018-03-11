import { BlockScript } from '../AnimationScript';
import { createDefaultUnitScript } from '../Store/utils/createDefaultUnitScript';
import { mapArrayValuesToObject } from '../utils/mapArrayValuesToObject';
import { AllBlockFieldNames } from './AllBlockFieldNames';
import { BlockFieldUnits } from './BlockFieldUnits';
import { DefaultBlock } from './DefaultBlock';

export const DefaultBlockScript: BlockScript = mapArrayValuesToObject(
    AllBlockFieldNames,
    (blockFieldName) => {
        return createDefaultUnitScript(
            BlockFieldUnits[blockFieldName] as any,
            DefaultBlock[blockFieldName],
        );
    },
);
