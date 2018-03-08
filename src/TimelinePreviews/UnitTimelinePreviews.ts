import * as React from 'react';
import { UnitScript } from '../AnimationScript';
import { Unit } from '../Unit/Unit';
import { ColorTimeLinePreview } from './ColorTimelinePreview';
import { NumberTimelinePreview } from './NumberTimelinePreview';

export type TimelitePreviewProps<T extends Unit> = {
    unitScript: UnitScript<T>;
};

export const UnitTimelinePreviews: Record<Unit, React.ComponentClass<TimelitePreviewProps<Unit>>> = {
    [Unit.degree]: NumberTimelinePreview,
    [Unit.percent]: NumberTimelinePreview,
    [Unit.pixel]: NumberTimelinePreview,
    [Unit.color]: ColorTimeLinePreview,
};
