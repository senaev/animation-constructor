import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AllAnimationElementsNames } from '../../AnimationElements/AllAnimationElementsNames';
import { AnimationElements } from '../../AnimationElements/AnimationElements';
import { AnimationElementsTitles } from '../../AnimationElements/AnimationElementsTitles';
import { actions } from '../../Store/actions';
import * as c from './index.pcss';

export type BoardPaletteProps = {
    addStandardElement: (elementName: AnimationElements) => void;
};

class BoardPaletteComponent extends React.Component<BoardPaletteProps, {}> {
    public render() {
        return <div className={ c.BoardPalette }>
            {
                AllAnimationElementsNames.map((elementName, key) => {
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
        dispatch(actions.addStandardElement(elementName));
    },
});

export const BoardPalette = connect(undefined, mapDispatchToProps)(BoardPaletteComponent);
