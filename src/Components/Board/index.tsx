import * as React from 'react';
import { BoardPalette } from '../BoardPalette';
import { BoardPreview } from '../BoardPreview';
import { BoardTimeLines } from '../BoardTimeLines';
import { JSONEditorButtonConnected } from '../JSONEditor/JSONEditorButton/connected';
import { JSONEditorScreenConnected } from '../JSONEditor/JSONEditorScreen/connected';

export type BoardParams = {
    isEditingAsJSON: boolean;
};

export class Board extends React.Component<BoardParams, {}> {
    public render() {
        const {
            isEditingAsJSON,
        } = this.props;

        return <>
            <BoardPreview/>
            <BoardPalette/>
            <BoardTimeLines/>
            {
                isEditingAsJSON
                    ? <JSONEditorScreenConnected/>
                    : <JSONEditorButtonConnected/>
            }
        </>;
    }
}
