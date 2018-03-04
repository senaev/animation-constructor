import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AllAnimationElementsDescriptions } from '../../../AnimationElements/AllAnimationElementsDescriptions';
import { AnimationElementScript } from '../../../AnimationScript';
import { ALL_BLOCK_POSITION_FIELD_NAMES } from '../../../BlockPosition/ALL_BLOCK_POSITION_FIELD_NAMES';
import { BlockPositionFieldTitles } from '../../../BlockPosition/BlockPositionFieldTitles';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import { setAnimationPositionAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { getAnimationElementScript } from '../../utils/getAnimationElementScript';
import { TimeLine } from '../Timeline';
import { createTimeLineForUnitScript } from '../Timeline/createTimeLineForUnitScript';
import * as c from './index.pcss';

export type AnimationTimelinesOwnProps = {};
export type AnimationTimelinesStateProps = {
    animationPosition: ConstructorState['animationPosition'];
    animationElementScript: AnimationElementScript | undefined;
};
export type AnimationTimelinesDispatchProps = {
    setAnimationPosition: (animationPosition: ConstructorState['animationPosition']) => void;
};

export type AnimationTimelinesProps =
    & AnimationTimelinesOwnProps
    & AnimationTimelinesStateProps
    & AnimationTimelinesDispatchProps;

class AnimationTimelinesComponent extends React.Component<AnimationTimelinesProps, {}> {
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
                    : this.createAnimationElementFieldsTimeLines(animationElementScript)
            }
        </div>
            ;
    }

    private onPositionChange = (nextAnimationPosition: number) => {
        this.props.setAnimationPosition(nextAnimationPosition);
    }

    private createAnimationElementFieldsTimeLines = ({
                                                         elementName,
                                                         blockPositionScript,
                                                         fieldsScript,
                                                     }: AnimationElementScript) => {
        return <React.Fragment>
            { ALL_BLOCK_POSITION_FIELD_NAMES.map((blockPositionFieldName, i) => {
                const title = BlockPositionFieldTitles[blockPositionFieldName];

                return <div
                    key={ i }
                    className={ c.AnimationTimelines__TimeLine__padding }
                >
                    <div className={ c.AnimationTimelines__TimeLine__title }>{ title }</div>
                    { createTimeLineForUnitScript(blockPositionScript[blockPositionFieldName]) }
                </div>;
            }) }
            { getObjectKeys(fieldsScript).map((fieldName, i) => {
                const title = AllAnimationElementsDescriptions[elementName][fieldName].fieldTitle;

                return <div
                    key={ i }
                    className={ c.AnimationTimelines__TimeLine__padding }
                >
                    <div className={ c.AnimationTimelines__TimeLine__title }>
                        { title }
                    </div>
                    { createTimeLineForUnitScript(fieldsScript[fieldName]) }
                </div>;
            }) }
        </React.Fragment>;
    }
}

const mapStateToProps = (state: ConstructorState): AnimationTimelinesStateProps => {
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

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): AnimationTimelinesDispatchProps => ({
    setAnimationPosition: (animationPosition) => {
        dispatch(setAnimationPositionAction(animationPosition));
    },
});

export const AnimationTimelines = connect(mapStateToProps, mapDispatchToProps)(AnimationTimelinesComponent);
