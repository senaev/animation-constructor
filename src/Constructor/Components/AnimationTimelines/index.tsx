import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../../AnimationScript';
import { setAnimationPositionAction, setBlockPositionScriptActionPositionAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { ActionPosition } from '../../Store/types/ActionPosition';
import { getAnimationElementScript } from '../../utils/getAnimationElementScript';
import { AnimationElementFieldsTimeLines } from '../AnimationElementFieldsTimeLines';
import { TimeLine, TimeLineMoveParams } from '../TimeLine';
import * as c from './index.pcss';

export type AnimationTimeLinesStateProps = {
    animationPosition: ConstructorState['animationPosition'];
    animationElementScript: AnimationElementScript<AnimationElementName> | undefined;
};
export type AnimationTimeLinesDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorState['animationPosition']) => void;
    setBlockPositionScriptActionPosition: (actionPosition: ActionPosition) => void;
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
                pointPositoins={ [animationPosition] }
                onMovePoint={ this.onPositionChange }
            >
                <div className={ c.AnimationTimelines__positionTimeLine }/>
            </TimeLine>
            {
                animationElementScript === undefined
                    ? null
                    : <AnimationElementFieldsTimeLines
                        animationElementScript={ animationElementScript }
                    />
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
        : getAnimationElementScript(state, editParams.blockLocation);

    return {
        animationPosition,
        animationElementScript,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): AnimationTimeLinesDispatchProps => ({
    setAnimationPosition: (animationPosition) => {
        dispatch(setAnimationPositionAction(animationPosition));
    },
    setBlockPositionScriptActionPosition: (actionPosition: ActionPosition) => {
        dispatch(setBlockPositionScriptActionPositionAction(actionPosition));
    },
});

export const AnimationTimelines = connect(mapStateToProps, mapDispatchToProps)(AnimationTimeLinesComponent);
