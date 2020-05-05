import { BlockScript } from '../AnimationScript';
import { createDefaultUnitScript } from '../Store/utils/createDefaultUnitScript';
import { mapObjectValues } from '../utils/mapObjectValues';
import { BlockFieldUnits } from './BlockFieldUnits';
import { DefaultBlock } from './DefaultBlock';

export const DefaultBlockScript: BlockScript = mapObjectValues(
    BlockFieldUnits,
    (unit, fieldName) => {
        return createDefaultUnitScript({
            unit,
            value: DefaultBlock[fieldName],
        } as any) as any;
    },
);
