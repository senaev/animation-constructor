import * as React from 'react';
import { UnitScript } from '../AnimationScript';
import { Unit } from '../Unit/Unit';
import { UnitTypes } from '../Unit/UnitTypes';
import { BooleanTimeLinePreview } from './BooleanTimeLinePreview';
import { ColorTimeLinePreview } from './ColorTimeLinePreview';
import { NumberTimeLinePreview } from './NumberTimeLinePreview';

export type TimeLinePreviewProps<T extends Unit> = {
    size: UnitTypes['pixel'];
    unitScript: UnitScript<T>;
};

export const UnitTimeLinePreviews: {
    [key in Unit]: React.ComponentClass<TimeLinePreviewProps<key>>;
} = {
    degree: NumberTimeLinePreview,
    percent: NumberTimeLinePreview,
    percentZeroToInfinity: NumberTimeLinePreview,
    pixel: NumberTimeLinePreview,
    color: ColorTimeLinePreview,
    boolean: BooleanTimeLinePreview,
};

export function getUnitTimeLinePreviewClass<T extends Unit>(unit: T): React.ComponentClass<TimeLinePreviewProps<T>> {
    return UnitTimeLinePreviews[unit] as any;
}
