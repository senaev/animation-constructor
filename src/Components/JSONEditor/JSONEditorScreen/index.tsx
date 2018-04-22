import * as cx from 'classnames';
import JSONEditor, * as jsoneditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import * as React from 'react';
import { AnimationScript } from '../../../AnimationScript';
import { validateAnimationScript } from '../../../AnimationScript/utils/validateAnimationScript';
import * as c from './index.pcss';

const JSONEditorClass = jsoneditor as any as typeof jsoneditor.default;

export type JSONEditorScreenParams = {
    animationScript: AnimationScript;
};

export type JSONEditorScreenCallbacks = {
    onCancel: () => void;
    onSave: (nextAnimationScript: AnimationScript) => void;
};

export type JSONEditorScreenProps =
    & JSONEditorScreenParams
    & JSONEditorScreenCallbacks;

export type JSONEditorScreenState = {
    validationErrorMessage: string | undefined;
};

const SAVE_TITLE = 'Сохранить';
const CANCEL_TITLE = 'Отмена';

export class JSONEditorScreen extends React.Component<JSONEditorScreenProps, JSONEditorScreenState> {
    private editorContainer?: HTMLDivElement | null;
    private jsonEditor?: JSONEditor;

    constructor(props: JSONEditorScreenProps) {
        super(props);

        this.state = {
            validationErrorMessage: undefined,
        };
    }

    public render() {
        const {
            validationErrorMessage,
        } = this.state;

        const {
            onCancel,
        } = this.props;

        return <div
            className={ c.JSONEditorScreen }
        >
            <div className={ c.JSONEditorScreen__editorContainer }>
                <div
                    className={ c.JSONEditorScreen__editorContainer__absoluteSizer }
                    ref={ (element) => {
                        this.editorContainer = element;
                    } }
                />
            </div>
            <div
                className={ c.JSONEditorScreen__validationIndicator }
            >
                {
                    validationErrorMessage === undefined
                        ? null
                        : <div className={ c.JSONEditorScreen__validationIndicator__message }>
                            { validationErrorMessage }
                        </div>
                }
            </div>
            <div className={ c.JSONEditorScreen__buttons }>
                <button
                    onClick={ onCancel }
                    className={ cx(c.JSONEditorScreen__buttons__button, c.JSONEditorScreen__buttons__button_cancel) }
                >{ CANCEL_TITLE }</button>
                {
                    validationErrorMessage === undefined
                        ? <button
                            onClick={ this.save }
                            className={ cx(c.JSONEditorScreen__buttons__button, c.JSONEditorScreen__buttons__button_save) }
                        >{ SAVE_TITLE }</button>
                        : null
                }
            </div>
        </div>;
    }

    public componentDidMount() {
        const {
            editorContainer,
        } = this;

        if (!editorContainer) {
            throw new Error('editorContainer has not been initialized');
        }

        this.jsonEditor = new JSONEditorClass(editorContainer, {
            mode: 'code',
            onChange: this.refreshValidation,
        }, this.props.animationScript);
    }

    public componentWillUnmount() {
        const {
            jsonEditor,
        } = this;

        if (!jsonEditor) {
            throw new Error('jsonEditor has not been initialized');
        }

        jsonEditor.destroy();
    }

    private refreshValidation = () => {
        const {
            jsonEditor,
        } = this;

        if (!jsonEditor) {
            throw new Error('jsonEditor has not been initialized');
        }

        const jsonString = jsonEditor.getText();

        let json: any;
        try {
            json = JSON.parse(jsonString);
        } catch ({ message }) {
            this.setState({
                validationErrorMessage: `JSON Error [${message}]`,
            });

            return;
        }

        try {
            validateAnimationScript(json);

            this.setState({
                validationErrorMessage: undefined,
            });
        } catch ({ message }) {
            this.setState({
                validationErrorMessage: message,
            });
        }
    }

    private save = () => {
        const {
            jsonEditor,
        } = this;

        if (!jsonEditor) {
            throw new Error('jsonEditor has not been initialized');
        }

        const jsonString = jsonEditor.getText();
        const animationScript = JSON.parse(jsonString);

        this.props.onSave(animationScript);
    }
}
