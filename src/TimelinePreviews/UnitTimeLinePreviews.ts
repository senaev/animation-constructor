import * as React from 'react';
import { UnitScript } from '../AnimationScript';
import { Unit } from '../Unit/Unit';
import { BooleanTimeLinePreview } from './BooleanTimeLinePreview';
import { ColorTimeLinePreview } from './ColorTimeLinePreview';
import { NumberTimeLinePreview } from './NumberTimeLinePreview';

export type TimeLinePreviewProps<T extends Unit> = {
    unitScript: UnitScript<T>;
};

export const UnitTimeLinePreviews: Record<Unit, React.ComponentClass<TimeLinePreviewProps<Unit>>> = {
    [Unit.degree]: NumberTimeLinePreview as React.ComponentClass<TimeLinePreviewProps<Unit>>,
    [Unit.percent]: NumberTimeLinePreview as React.ComponentClass<TimeLinePreviewProps<Unit>>,
    [Unit.pixel]: NumberTimeLinePreview as React.ComponentClass<TimeLinePreviewProps<Unit>>,
    [Unit.color]: ColorTimeLinePreview as React.ComponentClass<TimeLinePreviewProps<Unit>>,
    [Unit.boolean]: BooleanTimeLinePreview as React.ComponentClass<TimeLinePreviewProps<Unit>>,
};
