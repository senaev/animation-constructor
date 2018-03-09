import * as React from 'react';
import { UnitScript } from '../AnimationScript';
import { Unit } from '../Unit/Unit';
import { ColorTimeLinePreview } from './ColorTimelinePreview';
import { NumberTimelinePreview } from './NumberTimelinePreview';

export type TimelitePreviewProps<T extends Unit> = {
    unitScript: UnitScript<T>;
};

export const UnitTimelinePreviews: Record<Unit, React.ComponentClass<TimelitePreviewProps<Unit>>> = {
    [Unit.degree]: NumberTimelinePreview as React.ComponentClass<TimelitePreviewProps<Unit>>,
    [Unit.percent]: NumberTimelinePreview as React.ComponentClass<TimelitePreviewProps<Unit>>,
    [Unit.pixel]: NumberTimelinePreview as React.ComponentClass<TimelitePreviewProps<Unit>>,
    [Unit.color]: ColorTimeLinePreview as React.ComponentClass<TimelitePreviewProps<Unit>>,
};
