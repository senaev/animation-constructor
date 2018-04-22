import * as React from 'react';
import * as c from './index.pcss';

export type JSONEditorButtonCallbacks = {
    onClick: () => void;
};

const EDIT_AS_JSON_TITLE = 'Редактировать как JSON';

export class JSONEditorButton extends React.Component<JSONEditorButtonCallbacks, {}> {
    public render() {
        const {
            onClick,
        } = this.props;

        return <div
            className={ c.JSONEditorButton }
            onClick={ onClick }
        >
            { EDIT_AS_JSON_TITLE }
        </div>;
    }
}
