import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { ALL_ANIMATION_ELEMENT_NAMES } from '../../AnimationElements/ALL_ANIMATION_ELEMENT_NAMES';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementsTitles } from '../../AnimationElements/AnimationElementsTitles';
import { addStandardElementAction } from '../../Store/actions';
import * as c from './index.pcss';

export type BoardPaletteProps = {
    addStandardElement: (elementName: AnimationElements) => void;
};

class BoardPaletteComponent extends React.Component<BoardPaletteProps, {}> {
    public render() {
        return <div className={ c.BoardPalette }>
            {
                ALL_ANIMATION_ELEMENT_NAMES.map((elementName, key) => {
                    return <div
                        key={ key }
                        className={ c.BoardPalette__element }
                        onClick={ () => {
                            this.props.addStandardElement(elementName);
                        } }
                    >
                        { AnimationElementsTitles[elementName] }
                    </div>;
                })
            }
        </div>;
    }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardPaletteProps => ({
    addStandardElement: (elementName) => {
        dispatch(addStandardElementAction(elementName));
    },
});

export const BoardPalette = connect(undefined, mapDispatchToProps)(BoardPaletteComponent);
