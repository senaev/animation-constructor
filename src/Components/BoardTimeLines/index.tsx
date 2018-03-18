import * as React from 'react';
import { TimeLines } from '../TimeLines';
import * as c from './index.pcss';

export class BoardTimeLines extends React.Component<{}, {}> {
    public render() {
        return <div className={ c.BoardTimeLines }>
            <div className={ c.BoardTimeLines__padding }>
                <TimeLines/>
            </div>
        </div>;
    }
}
