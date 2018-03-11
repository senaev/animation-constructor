import { GridList, List, ListItem, RaisedButton, Subheader } from 'material-ui';
import { lightBlack } from 'material-ui/styles/colors';
import { ActionSettings, ContentClear, ContentSave, MapsZoomOutMap } from 'material-ui/svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AnimationElementFieldsNames } from '../../AnimationElements/AnimationElementFieldsNames';
import { AnimationElementFieldsTypes } from '../../AnimationElements/AnimationElementFieldsTypes';
import { AnimationElementFieldsValues } from '../../AnimationElements/AnimationElementFieldsValues';
import { AnimationElementFieldTitles } from '../../AnimationElements/AnimationElementFieldTitles';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementsFieldsUnits } from '../../AnimationElements/AnimationElementsFieldsUnits';
import { AllBlockFieldNames } from '../../Block/AllBlockFieldNames';
import { Block } from '../../Block/Block';
import { BlockFieldName } from '../../Block/BlockFieldName';
import { BlockFieldTitles } from '../../Block/BlockFieldTitles';
import { BlockFieldUnits } from '../../Block/BlockFieldUnits';
import { BlockMinValues } from '../../Block/BlockMinValues';
import { ALL_FIELDS } from '../../Fields/ALL_FIELDS';
import {
    discardChangesAction,
    saveElementAction,
    setEditedBlockFieldsAction,
    setEditedElementFieldsAction,
} from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { UnitTitles } from '../../Unit/UnitTitles';
import { getObjectKeys } from '../../utils/getObjectKeys';
import * as c from './index.pcss';

export type BoardFieldsStateProps = Pick<ConstructorState,
    | 'editParams'
    | 'animationScript'
    | 'animationPosition'>;

export type BoardFieldsDispatchProps = {
    saveElement: () => void;
    discardChanges: () => void;
    setEditedBlockFields: (blockFields: Partial<Block>) => void;
    setEditedElementFields: (elementFields: Partial<AnimationElementFieldsTypes<AnimationElementName>>) => void;
};

export type BoardFieldsProps =
    & BoardFieldsStateProps
    & BoardFieldsDispatchProps;

class BoardFieldsComponent extends React.Component<BoardFieldsProps, {}> {
    public render() {
        const {
            animationScript,
            editParams,
        } = this.props;

        if (editParams === undefined) {
            throw new Error('editParams cannot be undefined on BoardFieldsComponent rendering');
        }

        const {
            elementName,
            blockScript,
            fieldsScript,
        } = animationScript[editParams.blockLocation[0]];

        const blockSubmenuTitle = AllBlockFieldNames.map((blockFieldName, key, arr) => {
            const fieldTitle = BlockFieldTitles[blockFieldName];
            const fieldName = BlockFieldUnits[blockFieldName];

            const FieldClass = ALL_FIELDS[fieldName];

            return <span key={ key }>
                {
                    `${fieldTitle} `
                }
                <FieldClass.Preview value={ blockScript[blockFieldName].actions[0].value }/>
                {
                    arr.length === key + 1 ? '' : ', '
                }
            </span>;
        });

        const allElementFieldNames = getObjectKeys(AnimationElementsFieldsUnits[elementName]);

        const customFieldsSubmenuTitle = allElementFieldNames.map((fieldName, key, arr) => {
            const fieldTitle = AnimationElementFieldTitles[elementName][fieldName];

            const unit = AnimationElementsFieldsUnits[elementName][fieldName];

            const FieldClass = ALL_FIELDS[unit];

            const value: any = fieldsScript[fieldName].actions[0].value;

            return <span key={ key }>
                {
                    `${fieldTitle} `
                }
                <FieldClass.Preview value={ value }/>
                {
                    arr.length === key + 1 ? '' : ', '
                }
            </span>;
        });

        return <div className={ c.BoardFields }>
            <GridList cols={ 2 } cellHeight={ 'auto' }>
                <List>
                    <Subheader inset={ true }>Расположение блока</Subheader>
                    <ListItem
                        primaryText={ blockSubmenuTitle }
                        leftIcon={ <MapsZoomOutMap/> }
                        initiallyOpen={ false }
                        primaryTogglesNestedList={ true }
                        nestedItems={
                            AllBlockFieldNames.map((blockFieldName, key) => {
                                const fieldTitle = BlockFieldTitles[blockFieldName];
                                const unit = BlockFieldUnits[blockFieldName];

                                const FieldClass = ALL_FIELDS[unit];

                                return <ListItem key={ key }
                                                 secondaryText={
                                                     `${fieldTitle} (${UnitTitles[unit]})`
                                                 }>
                                    <FieldClass
                                        value={ blockScript[blockFieldName].actions[0].value }
                                        onChange={ this.changeElementPosition(blockFieldName) }/>
                                </ListItem>;
                            })
                        }/>
                </List>
                <List>
                    <Subheader inset={ true }>Параметры блока</Subheader>
                    <ListItem
                        primaryText={ customFieldsSubmenuTitle }
                        leftIcon={ <ActionSettings/> }
                        initiallyOpen={ false }
                        primaryTogglesNestedList={ true }
                        nestedItems={
                            allElementFieldNames.map((fieldName, key) => {
                                const fieldTitle = AnimationElementFieldTitles[elementName][fieldName];
                                const unit = AnimationElementsFieldsUnits[elementName][fieldName];
                                const FieldClass = ALL_FIELDS[unit];
                                const unitName = FieldClass.unit;
                                const value: any = fieldsScript[fieldName].actions[0].value;

                                return <ListItem key={ key }
                                                 secondaryText={ `${fieldTitle} (${UnitTitles[unitName]})` }>
                                    <FieldClass value={ value }
                                                onChange={ this.changeElementField(fieldName) }/>
                                </ListItem>;
                            })
                        }/>
                </List>
            </GridList>
            <div className={ c.BoardFields__buttons }>
                <RaisedButton
                    secondary={ true }
                    icon={ <ContentClear color={ lightBlack }/> }
                    onClick={ this.props.discardChanges }
                />
                <RaisedButton
                    backgroundColor={ '#a4c639' }
                    icon={ <ContentSave color={ lightBlack }/> }
                    onClick={ this.saveElement }
                />
            </div>
        </div>;
    }

    private changeElementPosition = (positionFieldName: BlockFieldName): (value: number) => void => {
        const blockFieldMinValue = BlockMinValues[positionFieldName];
        const min = blockFieldMinValue === undefined
            ? -Infinity
            : blockFieldMinValue;

        return (value) => {
            const normalizedValue = Math.max(value, min);

            this.props.setEditedBlockFields({ [positionFieldName]: normalizedValue });
        };
    }

    private changeElementField = (fieldName: AnimationElementFieldsNames<AnimationElementName>) => {
        return (value: AnimationElementFieldsValues<AnimationElementName>) => {
            this.props.setEditedElementFields({ [fieldName]: value });
        };
    }

    private saveElement = () => {
        this.props.saveElement();
    }
}

const mapStateToProps = ({
                             editParams,
                             animationScript,
                             animationPosition,
                         }: ConstructorState): BoardFieldsStateProps => {
    return {
        editParams,
        animationScript,
        animationPosition,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardFieldsDispatchProps => ({
    saveElement: () => {
        dispatch(saveElementAction());
    },
    discardChanges: () => {
        dispatch(discardChangesAction());
    },
    setEditedBlockFields: (position) => {
        dispatch(setEditedBlockFieldsAction(position));
    },
    setEditedElementFields: (elementFields: Partial<AnimationElementFieldsTypes<AnimationElementName>>) => {
        dispatch(setEditedElementFieldsAction(elementFields));
    },
});

export const BoardFields = connect(mapStateToProps, mapDispatchToProps)(BoardFieldsComponent);
