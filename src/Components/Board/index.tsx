import * as React from 'react';
import { BoardPalette } from '../BoardPalette';
import { BoardPreview } from '../BoardPreview';
import { BoardTimeLines } from '../BoardTimeLines';

export class Board extends React.Component<{}, {}> {
    public render() {
        return <>
            <BoardPreview/>
            <BoardPalette/>
            <BoardTimeLines/>
        </>;
    }
}
