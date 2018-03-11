import { IconButton, IconMenu, MenuItem, RaisedButton, Toolbar, ToolbarGroup, } from 'material-ui';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { ALL_STANDARD_ELEMENT_NAMES } from '../../AnimationElements/ALL_STANDARD_ELEMENT_NAMES';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementsTitles } from '../../AnimationElements/AnimationElementsTitles';
import { addStandardElementAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';

export type BoardPaletteStateProps = {};

export type BoardPaletteDispatchProps = {
    addStandardElement: (elementName: AnimationElementName) => void;
};

export type BoardPaletteProps =
    & BoardPaletteStateProps
    & BoardPaletteDispatchProps;

class BoardPaletteComponent extends React.Component<BoardPaletteProps, {
    isMenuOpened: boolean;
}> {
    constructor(props: BoardPaletteProps) {
        super(props);

        this.state = {
            isMenuOpened: false,
        };
    }

    public render() {
        return <Toolbar>
            <ToolbarGroup firstChild={ true }>
                <RaisedButton onClick={ this.openMenu } label={ 'Добавить элемент' }/>
                <IconMenu
                    iconButtonElement={ <IconButton><NavigationExpandMoreIcon/></IconButton> }
                    open={ this.state.isMenuOpened }
                    onRequestChange={ this.setMenuOpened }
                    onChange={ (e, standardElementName) => {
                        this.props.addStandardElement(standardElementName);
                    } }
                >
                    {
                        ALL_STANDARD_ELEMENT_NAMES.map((elementName, key) => <MenuItem
                            key={ key }
                            value={ elementName }
                            primaryText={ AnimationElementsTitles[elementName] }
                        />)
                    }
                </IconMenu>
            </ToolbarGroup>
        </Toolbar>;
    }

    private openMenu = () => {
        this.setMenuOpened(true);
    }

    private setMenuOpened = (opened: boolean) => {
        this.setState({
            isMenuOpened: opened,
        });
    }
}

const mapStateToProps = ({}: ConstructorState): BoardPaletteStateProps => ({});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardPaletteDispatchProps => ({
    addStandardElement: (elementName) => {
        dispatch(addStandardElementAction(elementName));
    },
});

export const BoardPalette = connect(mapStateToProps, mapDispatchToProps)(BoardPaletteComponent);
