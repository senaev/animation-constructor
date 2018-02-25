import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { ALL_STANDARD_ELEMENTS } from '../../../AnimationElements/ALL_STANDARD_ELEMENTS';
import { AnimationElement } from '../../../AnimationElements/AnimationElement';
import { getElementDefaultFieldsValues } from '../../../AnimationElements/utils/getElementDefaultFieldsValues';
import { BlockPosition, BlockSize, PointCoordinates } from '../../../BlockPosition/BlockPosition';
import { blockPositionToStyles } from '../../../BlockPosition/utils/blockPositionToStyles';
import { addStylesToPage } from '../../../utils/addStylesToPage';
import { ResizeSensor } from '../../../utils/ResizeSensor';
import { setEditedElementPositionAction } from '../../Store/actions';
import { ConstructorState, EditedElement } from '../../Store/State';
import { Resizer } from '../Resizer';

export type DrawingStateProps = {};
export type DrawingOwnProps = {
    editedElement: EditedElement;
};

export type DrawingDispatchProps = {
    setEditedElementPosition: (position: BlockPosition) => void;
};

export type DrawingProps =
    & DrawingOwnProps
    & DrawingStateProps
    & DrawingDispatchProps;

// TODO
addStylesToPage(document, require('./index.css'));

class DrawingComponent extends React.Component<DrawingProps, {}> {
    private elementContainer: HTMLDivElement;
    private elementContainerResizeSensor: ResizeSensor;

    private animationElement: AnimationElement<any>;

    public render() {
        const {
            position,
        } = this.props.editedElement;

        const {
            y,
            x,
            height,
            width,
            rotation,
        } = position;

        const elementContainerStyle = blockPositionToStyles(position);

        return <div className={ 'Drawing' }>
            <div
                className={ 'Drawing_elementContainer' }
                ref={ (element) => {
                    this.elementContainer = element!;
                } }
                style={ elementContainerStyle }
            />
            <Resizer
                y={ y }
                x={ x }
                height={ height }
                width={ width }
                rotation={ rotation }
                onResize={ this.onResize }
                onRotate={ this.onRotate }
                onMove={ this.onMove }
            />
        </div>;
    }

    public componentDidMount() {
        const { elementName } = this.props.editedElement;

        const AnimationElementClass = ALL_STANDARD_ELEMENTS[elementName];

        this.elementContainerResizeSensor = new ResizeSensor(this.elementContainer, ({ width, height }) => {
            this.animationElement.setSize(Math.min(width, height));
        });
        const initialSize = this.elementContainerResizeSensor.getSize();
        const size = Math.min(initialSize.width, initialSize.height);

        this.animationElement = new AnimationElementClass(
            this.elementContainer,
            size,
            getElementDefaultFieldsValues(elementName),
        );
    }

    public componentWillReceiveProps({ editedElement: { fieldsValues } }: DrawingProps) {
        this.animationElement.setValuesAbstract(fieldsValues);
    }

    private onResize = (newSize: BlockSize) => {
        this.props.setEditedElementPosition({
            ...this.props.editedElement.position,
            ...newSize,
        });
    }

    private onRotate = (rotation: number) => {
        this.props.setEditedElementPosition({
            ...this.props.editedElement.position,
            rotation,
        });
    }

    private onMove = (newCoordinates: PointCoordinates) => {
        this.props.setEditedElementPosition({
            ...this.props.editedElement.position,
            ...newCoordinates,
        });
    }
}

const mapStateToProps = (state: ConstructorState,
                         {
                             editedElement,
                         }: DrawingOwnProps): DrawingStateProps => {
    return {
        editedElement,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): DrawingDispatchProps => ({
    setEditedElementPosition: (position) => {
        dispatch(setEditedElementPositionAction(position));
    },
});

export const Drawing = connect(mapStateToProps, mapDispatchToProps)(DrawingComponent);
