import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { AnimationElementFieldTitles } from '../../AnimationElements/AnimationElementFieldTitles';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { BlockPositionFieldTitles } from '../../BlockPosition/BlockPositionFieldTitles';
import {
    setBlockPositionScriptActionPositionAction,
} from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import { ActionPosition } from '../../Store/types/ActionPosition';
import { getEditedAnimationElementScript } from '../../Store/utils/getEditedAnimationElementScript';
import { getObjectKeys } from '../../utils/getObjectKeys';
import * as c from '../AnimationTimeLines/index.pcss';
import { UnitScriptTimeLine } from '../UnitScriptTimeLine';

export type AnimationElementFieldsTimeLinesStateProps = {
    animationElementScript: AnimationElementScript<AnimationElementName>;
};

export type AnimationElementFieldsTimeLinesDispatchProps = {
    setBlockPositionScriptActionPosition: (actionPosition: ActionPosition) => void;
};

export type AnimationElementFieldsTimeLinesProps =
    & AnimationElementFieldsTimeLinesStateProps
    & AnimationElementFieldsTimeLinesDispatchProps;

class AnimationElementFieldsTimeLinesComponent extends React.Component<AnimationElementFieldsTimeLinesProps, {}> {
    public render() {
        const {
            animationElementScript,
            setBlockPositionScriptActionPosition,
        } = this.props;

        const {
            elementName,
            blockPositionScript,
            fieldsScript,
        } = animationElementScript;

        return <>
            { getObjectKeys(blockPositionScript).map((blockPositionFieldName, i) => {
                const title = BlockPositionFieldTitles[blockPositionFieldName];

                return <div
                    key={ i }
                    className={ c.AnimationTimelines__TimeLine__padding }
                >
                    <div className={ c.AnimationTimelines__TimeLine__title }>{ title }</div>
                    <UnitScriptTimeLine
                        unitScript={ blockPositionScript[blockPositionFieldName] }
                        onMovePoint={ ({
                                           pointIndex,
                                           position,
                                       }) => {
                            setBlockPositionScriptActionPosition({
                                blockPositionFieldName,
                                actionIndex: pointIndex,
                                position,
                            });
                        } }
                    />
                </div>;
            }) }
            { getObjectKeys(fieldsScript).map((fieldName, i) => {
                const title = AnimationElementFieldTitles[elementName][fieldName];

                return <div
                    key={ i }
                    className={ c.AnimationTimelines__TimeLine__padding }
                >
                    <div className={ c.AnimationTimelines__TimeLine__title }>
                        { title }
                    </div>
                    <UnitScriptTimeLine unitScript={ fieldsScript[fieldName] }/>
                </div>;
            }) }
        </>;
    }
}


const mapStateToProps = (state: ConstructorState): AnimationElementFieldsTimeLinesStateProps => {
    return {
        animationElementScript: getEditedAnimationElementScript(state),
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): AnimationElementFieldsTimeLinesDispatchProps => ({
    setBlockPositionScriptActionPosition: (actionPosition: ActionPosition) => {
        dispatch(setBlockPositionScriptActionPositionAction(actionPosition));
    },
});

export const AnimationElementFieldsTimeLines =
    connect(mapStateToProps, mapDispatchToProps)(AnimationElementFieldsTimeLinesComponent);
