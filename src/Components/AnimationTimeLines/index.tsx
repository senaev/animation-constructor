import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { setAnimationPositionAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { AnimationElementFieldsTimeLines } from '../AnimationElementFieldsTimeLines';
import { TimeLine, TimeLineMoveParams } from '../TimeLine';
import * as c from './index.pcss';

export type AnimationTimeLinesStateProps = {
    animationPosition: ConstructorState['animationPosition'];
    animationElementScript: AnimationElementScript<AnimationElementName> | undefined;
};
export type AnimationTimeLinesDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorState['animationPosition']) => void;
};

export type AnimationTimeLinesProps =
    & AnimationTimeLinesStateProps
    & AnimationTimeLinesDispatchProps;

class AnimationTimeLinesComponent extends React.Component<AnimationTimeLinesProps, {}> {
    public render() {
        const {
            animationPosition,
            animationElementScript,
        } = this.props;

        return <div className={ c.AnimationTimelines }>
            <TimeLine
                points={ [{
                    position: animationPosition,
                    movable: true,
                }] }
                onMovePoint={ this.onPositionChange }
            >
                <div className={ c.AnimationTimelines__positionTimeLine }/>
            </TimeLine>
            {
                animationElementScript === undefined
                    ? null
                    : <AnimationElementFieldsTimeLines/>
            }
        </div>;
    }

    private onPositionChange = ({ position }: TimeLineMoveParams) => {
        this.props.setAnimationPosition(position);
    }
}

const mapStateToProps = (state: ConstructorState): AnimationTimeLinesStateProps => {
    const {
        animationPosition,
        editParams,
    } = state;

    const animationElementScript = editParams === undefined
        ? undefined
        : getEditedAnimationElementScript(state);

    return {
        animationPosition,
        animationElementScript,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): AnimationTimeLinesDispatchProps => ({
    setAnimationPosition: (animationPosition) => {
        dispatch(setAnimationPositionAction(animationPosition));
    },
});

export const AnimationTimelines = connect(mapStateToProps, mapDispatchToProps)(AnimationTimeLinesComponent);
