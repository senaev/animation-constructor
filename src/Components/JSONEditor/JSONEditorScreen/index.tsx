import * as React from 'react';
import * as c from './index.pcss';

export type JSONEditorScreenParams = {
    jsonString: string;
};

export type JSONEditorScreenCallbacks = {};

export type JSONEditorButtonProps =
    & JSONEditorScreenParams
    & JSONEditorScreenCallbacks;

export class JSONEditorScreen extends React.Component<JSONEditorButtonProps, {}> {
    public render() {
        const {
            jsonString,
        } = this.props;

        return <div
            className={ c.JSONEditorScreen }
        >
            { jsonString }
        </div>;
    }
}
