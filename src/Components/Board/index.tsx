import * as React from 'react';
import { BoardPalette } from '../BoardPalette';
import { BoardPreview } from '../BoardPreview';
import { TimeLines } from '../TimeLines';
import * as c from './index.pcss';

export class Board extends React.Component<{}, {}> {
    public render() {
        return <>
            <BoardPreview/>
            <BoardPalette/>
            <div className={ c.Board__animationControlsContainer }>
                <div className={ c.Board__animationControlsContainerPadding }>
                    <TimeLines/>
                </div>
            </div>
        </>;
    }
}
