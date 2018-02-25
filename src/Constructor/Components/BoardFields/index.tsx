import { GridList, List, ListItem, RaisedButton, Subheader } from 'material-ui';
import { lightBlack } from 'material-ui/styles/colors';
import { ActionSettings, ContentClear, ContentSave, MapsZoomOutMap } from 'material-ui/svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AllAnimationElementsDescriptions } from '../../../AnimationElements/AllAnimationElementsDescriptions';
import {
    AnimationElementFieldsTypes, AnimationElementsFieldsValues,
} from '../../../AnimationElements/AnimationElementFields';
import { ALL_BLOCK_POSITION_FIELD_NAMES } from '../../../BlockPosition/ALL_BLOCK_POSITION_FIELD_NAMES';
import { BlockPosition } from '../../../BlockPosition/BlockPosition';
import { BlockPositionFieldName } from '../../../BlockPosition/BlockPositionFieldName';
import { BlockPositionFieldTitles } from '../../../BlockPosition/BlockPositionFieldTitles';
import { BlockPositionFieldUnits } from '../../../BlockPosition/BlockPositionFieldUnits';
import { BlockPositionMinValues } from '../../../BlockPosition/BlockPositionMinValues';
import { ALL_FIELDS } from '../../../Fields/ALL_FIELDS';
import { UnitName } from '../../../Unit/UNIT_NAMES';
import { UnitTitles } from '../../../Unit/UnitTitles';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import {
    discardChangesAction, saveElementAction, setEditedElementFieldsAction,
    setEditedElementPositionAction,
} from '../../Store/actions';
import { ConstructorState, EditedElement } from '../../Store/State';
import * as c from './index.pcss';

export type BoardFieldsStateProps = {};
export type BoardFieldsOwnProps = {
    editedElement: EditedElement;
};

export type BoardFieldsDispatchProps = {
    saveElement: (editedElement: EditedElement) => void;
    discardChanges: () => void;
    setEditedElementPosition: (position: BlockPosition) => void;
    setEditedElementFields: (elementFields: AnimationElementsFieldsValues) => void;
};

export type BoardFieldsProps =
    & BoardFieldsOwnProps
    & BoardFieldsStateProps
    & BoardFieldsDispatchProps;

class BoardFieldsComponent extends React.Component<BoardFieldsProps, {}> {
    public render() {
        const {
            position,
            elementName,
            fieldsValues,
        } = this.props.editedElement;

        const blockPositionSubmenuTitle = ALL_BLOCK_POSITION_FIELD_NAMES.map((blockPositionFieldName, key, arr) => {
            const fieldTitle = BlockPositionFieldTitles[blockPositionFieldName];
            const fieldName = BlockPositionFieldUnits[blockPositionFieldName];

            const FieldClass = ALL_FIELDS[fieldName];

            return <span key={ key }>
                {
                    `${fieldTitle} `
                }
                <FieldClass.Preview value={ position[blockPositionFieldName] }/>
                {
                    arr.length === key + 1 ? '' : ', '
                }
            </span>;
        });

        const fieldsDescriptions = AllAnimationElementsDescriptions[elementName];
        const allElementFieldNames = getObjectKeys(fieldsDescriptions);

        const customFieldsSubmenuTitle = allElementFieldNames.map((fieldName, key, arr) => {
            const {
                fieldTitle,
                unit,
            } = fieldsDescriptions[fieldName];

            const FieldClass = ALL_FIELDS[unit];

            return <span key={ key }>
                {
                    `${fieldTitle} `
                }
                <FieldClass.Preview value={ fieldsValues[fieldName] }/>
                {
                    arr.length === key + 1 ? '' : ', '
                }
            </span>;
        });

        return <div className={c.BoardFields}>
            <GridList cols={ 2 } cellHeight={ 'auto' }>
                <List>
                    <Subheader inset={ true }>Расположение блока</Subheader>
                    <ListItem
                        primaryText={ blockPositionSubmenuTitle }
                        leftIcon={ <MapsZoomOutMap/> }
                        initiallyOpen={ false }
                        primaryTogglesNestedList={ true }
                        nestedItems={
                            ALL_BLOCK_POSITION_FIELD_NAMES.map((blockPositionFieldName, key) => {
                                const fieldTitle = BlockPositionFieldTitles[blockPositionFieldName];
                                const unit = BlockPositionFieldUnits[blockPositionFieldName];

                                const FieldClass = ALL_FIELDS[unit];

                                return <ListItem key={ key }
                                                 secondaryText={
                                                     `${fieldTitle} (${UnitTitles[unit]})`
                                                 }>
                                    <FieldClass
                                        value={ position[blockPositionFieldName] }
                                        onChange={ this.changeElementPosition(blockPositionFieldName) }/>
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
                                const { unit, fieldTitle } = fieldsDescriptions[fieldName];
                                const FieldClass = ALL_FIELDS[unit];
                                const unitName = FieldClass.unit;

                                return <ListItem key={ key }
                                                 secondaryText={ `${fieldTitle} (${UnitTitles[unitName]})` }>
                                    <FieldClass value={ fieldsValues[fieldName] }
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

    private changeElementPosition = (positionFieldName: BlockPositionFieldName): (value: number) => void => {
        const blockPositionFieldMinValue = BlockPositionMinValues[positionFieldName];
        const min = blockPositionFieldMinValue === undefined
            ? -Infinity
            : blockPositionFieldMinValue;

        return (value) => {
            const {
                editedElement: {
                    position,
                },
                setEditedElementPosition,
            } = this.props;

            const normalizedValue = Math.max(value, min);

            setEditedElementPosition({
                ...position,
                [positionFieldName]: normalizedValue,
            });
        };
    }

    private changeElementField = (fieldName: string): (value: UnitTypes[UnitName]) => void => {
        return (value) => {
            const {
                fieldsValues,
            } = this.props.editedElement;

            this.props.setEditedElementFields({
                ...fieldsValues,
                [fieldName]: value,
            });
        };
    }

    private saveElement = () => {
        this.props.saveElement(this.props.editedElement);
    }
}

const mapStateToProps = (state: ConstructorState,
                         {
                             editedElement,
                         }: BoardFieldsOwnProps): BoardFieldsStateProps => {
    return {
        editedElement,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): BoardFieldsDispatchProps => ({
    saveElement: (editedElement) => {
        dispatch(saveElementAction(editedElement));
    },
    discardChanges: () => {
        dispatch(discardChangesAction());
    },
    setEditedElementPosition: (position) => {
        dispatch(setEditedElementPositionAction(position));
    },
    setEditedElementFields: (elementFields: AnimationElementFieldsTypes) => {
        dispatch(setEditedElementFieldsAction(elementFields));
    },
});

export const BoardFields = connect(mapStateToProps, mapDispatchToProps)(BoardFieldsComponent);
