import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { Block } from '../../Block/Block';
import { setEditedBlockFieldsAction, } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { PointCoordinates } from '../../types/PointCoordinates';
import { Size } from '../../types/Size';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { mapObjectValues } from '../../utils/mapObjectValues';
import { Resizer } from '../Resizer';
import * as c from './index.pcss';

export type DrawingStateProps = Pick<ConstructorState,
    | 'editParams'
    | 'animationScript'>;

export type DrawingDispatchProps = {
    setEditedBlockFields: (blockFields: Partial<Block>) => void;
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
            blockScript,
        } = animationScript[editParams.blockLocation[0]];

        const position = mapObjectValues(blockScript, (unitScript) => {
            return unitScript.actions[0].value;
        });

        const {
            y,
            x,
            height,
            width,
            rotation,
        } = position;

        return <div className={ c.Drawing }>
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
        this.props.setEditedBlockFields(blockSize);
    }

    private onRotate = (rotation: UnitTypes[Unit.degree]) => {
        this.props.setEditedBlockFields({ rotation });
    }

    private onMove = (pointCoordinates: PointCoordinates) => {
        this.props.setEditedBlockFields(pointCoordinates);
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
    setEditedBlockFields: (blockFields) => {
        dispatch(setEditedBlockFieldsAction(blockFields));
    },
});

export const Drawing = connect(mapStateToProps, mapDispatchToProps)(DrawingComponent);
