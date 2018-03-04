import * as React from 'react';
import { Unit } from '../../Unit/Unit';
import { TimelitePreviewProps } from '../UnitTimelinePreviews';
import * as c from './index.pcss';

export class ColorTimelinePreview extends React.Component<TimelitePreviewProps<Unit.color>> {
    public render() {
        return <div className={ c.ColorTimelinePreview }/>;
    }
}
