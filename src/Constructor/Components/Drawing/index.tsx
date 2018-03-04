import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { BlockPosition } from '../../../BlockPosition/BlockPosition';
import { blockPositionToStyles } from '../../../BlockPosition/utils/blockPositionToStyles';
import { PointCoordinates } from '../../../types/PointCoordinates';
import { Size } from '../../../types/Size';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { mapObjectValues } from '../../../utils/mapObjectValues';
import {
    setEditedBlockCoordinatesAction, setEditedBlockRotationAction,
    setEditedBlockSizeAction,
} from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { Resizer } from '../Resizer';
import * as c from './index.pcss';

export type DrawingStateProps = Pick<ConstructorState,
    | 'editParams'
    | 'animationScript'>;

export type DrawingDispatchProps = {
    setEditedBlockCoordinates: (pointCoordinates: PointCoordinates) => void;
    setEditedBlockSize: (blockSize: Size) => void;
    setEditedBlockRotation: (blockRotation: UnitTypes[Unit.degree]) => void;
};

export type DrawingProps =
    & DrawingStateProps
    & DrawingDispatchProps;

class DrawingComponent extends React.Component<DrawingProps, {}> {
    public render() {
        const {
            editParams,
            animationScript,
        } = this.props;

        if (editParams === undefined) {
            throw new Error('DrawingComponent should not be rendered without editParams');
        }

        const {
            blockPositionScript,
        } = animationScript[editParams.blockLocation[0]];

        const position: BlockPosition = mapObjectValues(blockPositionScript, (blockPositionFieldScript) => {
            return blockPositionFieldScript.actions[0].value as number;
        });

        const {
            y,
            x,
            height,
            width,
            rotation,
        } = position;

        const elementContainerStyle = blockPositionToStyles(position);

        return <div className={ c.Drawing }>
            <div
                className={ c.Drawing__elementContainer }
                ref={ (element) => {
                    // this.elementContainer = element!;
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

    private onResize = (blockSize: Size) => {
        this.props.setEditedBlockSize(blockSize);
    }

    private onRotate = (rotation: UnitTypes[Unit.degree]) => {
        this.props.setEditedBlockRotation(rotation);
    }

    private onMove = (pointCoordinates: PointCoordinates) => {
        this.props.setEditedBlockCoordinates(pointCoordinates);
    }
}

const mapStateToProps = ({
                             editParams,
                             animationScript,
                         }: ConstructorState): DrawingStateProps => {
    return {
        editParams,
        animationScript,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): DrawingDispatchProps => ({
    setEditedBlockCoordinates: (position) => {
        dispatch(setEditedBlockCoordinatesAction(position));
    },
    setEditedBlockSize: (blockSize) => {
        dispatch(setEditedBlockSizeAction(blockSize));
    },
    setEditedBlockRotation: (blockRotation) => {
        dispatch(setEditedBlockRotationAction(blockRotation));
    },
});

export const Drawing = connect(mapStateToProps, mapDispatchToProps)(DrawingComponent);
