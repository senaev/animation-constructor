import { IconButton, IconMenu, MenuItem, RaisedButton, Toolbar, ToolbarGroup, } from 'material-ui';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { ALL_STANDARD_ELEMENT_NAMES } from '../../../AnimationElements/ALL_STANDARD_ELEMENT_NAMES';
import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { AnimationElementsTitles } from '../../../AnimationElements/AnimationElementsTitles';
import { addStandardElementAction, setRelationAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { RelationInput } from '../RelationInput';

export type BoardPaletteStateProps = Pick<ConstructorState,
    | 'relation'>;

export type BoardPaletteDispatchProps = {
    addStandardElement: (elementName: AnimationElementName) => void;
    setRelation: (elementName: ConstructorState['relation']) => void;
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
        const {
            relation,
        } = this.props;

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
            <ToolbarGroup>
                <RelationInput
                    relation={ relation }
                    onChange={ (newRelation) => {
                        this.props.setRelation(newRelation);
                    } }/>
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

const mapStateToProps = ({
                             relation,
                         }: ConstructorState): BoardPaletteStateProps => ({
    relation,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardPaletteDispatchProps => ({
    addStandardElement: (elementName) => {
        dispatch(addStandardElementAction(elementName));
    },
    setRelation: (relation) => dispatch(setRelationAction(relation)),
});

export const BoardPalette = connect(mapStateToProps, mapDispatchToProps)(BoardPaletteComponent);
