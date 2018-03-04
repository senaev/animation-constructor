import * as React from 'react';
import { ScriptAction } from '../AnimationScript';
import { Unit } from '../Unit/Unit';
import { UnitName } from '../Unit/UNIT_NAMES';
import { ColorTimelinePreview } from './ColorTimelinePreview';
import { NumberTimelinePreview } from './NumberTimelinePreview';

export type TimelitePreviewProps<T extends UnitName> = {
    actions: ScriptAction<T>[];
};

export const UnitTimelinePreviews: Record<UnitName, React.ComponentClass<TimelitePreviewProps<UnitName>>> = {
    [Unit.degree]: NumberTimelinePreview,
    [Unit.percent]: NumberTimelinePreview,
    [Unit.pixel]: NumberTimelinePreview,
    [Unit.color]: ColorTimelinePreview,
};
