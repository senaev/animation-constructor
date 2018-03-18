import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { getFieldsValuesByPosition } from '../../Animation/util/getFieldsValuesByPosition';
import { Block } from '../../Block/Block';
import { setEditedBlockFieldsOnCurrentPositionAction, } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { Resizer } from '../Resizer';
import * as c from './index.pcss';

export type DrawingStateProps = {
    block: Block;
};

export type DrawingDispatchProps = {
    setEditedBlockFieldsOnCurrentPosition: (blockFields: Partial<Block>) => void;
};

export type DrawingProps =
    & DrawingStateProps
    & DrawingDispatchProps;

class DrawingComponent extends React.Component<DrawingProps, {}> {
    public render() {
        const {
            block,
        } = this.props;

        const {
            y,
            x,
            height,
            width,
            rotation,
            existence,
        } = block;

        return <div className={ c.Drawing }>
            <Resizer
                y={ y }
                x={ x }
                height={ height }
                width={ width }
                rotation={ rotation }
                existence={ existence }
                onResize={ this.onResize }
                onRotate={ this.onRotate }
                onMove={ this.onMove }
            />
        </div>;
    }

    private onResize = (blockSize: Size) => {
        this.props.setEditedBlockFieldsOnCurrentPosition(blockSize);
    }

    private onRotate = (rotation: UnitTypes[Unit.degree]) => {
        this.props.setEditedBlockFieldsOnCurrentPosition({ rotation });
    }

    private onMove = (pointCoordinates: PointCoordinates) => {
        this.props.setEditedBlockFieldsOnCurrentPosition(pointCoordinates);
    }
}

const mapStateToProps = (state: ConstructorState): DrawingStateProps => {
    const {
        blockScript,
    } = getEditedAnimationElementScript(state);

    const block = getFieldsValuesByPosition(state.animationPosition, blockScript);

    return {
        block,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): DrawingDispatchProps => ({
    setEditedBlockFieldsOnCurrentPosition: (blockFields) => {
        dispatch(setEditedBlockFieldsOnCurrentPositionAction(blockFields));
    },
});

export const Drawing = connect(mapStateToProps, mapDispatchToProps)(DrawingComponent);
