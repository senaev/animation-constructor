import * as React from 'react';
import { AnimationElementFieldTitles } from '../../AnimationElements/AnimationElementFieldTitles';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../AnimationScript';
import { getActionsParams } from '../../AnimationScript/utils/getActionsParams';
import { BlockPositionFieldTitles } from '../../BlockPosition/BlockPositionFieldTitles';
import { BlockPositionActionPosition, FieldActionPosition } from '../../Store/types/ActionPosition';
import { Unit } from '../../Unit/Unit';
import { UnitTypes } from '../../Unit/UnitTypes';
import { getObjectKeys } from '../../utils/getObjectKeys';
import * as c from '../AnimationTimeLines/index.pcss';
import { TimeLinePointProps } from '../TimeLinePoint';
import { UnitScriptTimeLine } from '../UnitScriptTimeLine';

// export type FieldsTimeLinesProps = {
//     fields: {
//         title: string;
//         unitScript: UnitScript<Unit>;
//         onMovePoint
//     }[];
// };
//
// export class FieldsTimeLines extends React.Component<FieldsTimeLinesProps, {}> {
//
// }

export type AnimationElementFieldsTimeLinesProps = {
    animationElementScript: AnimationElementScript<AnimationElementName>;
    containerWidth: UnitTypes[Unit.pixel];
    setBlockPositionScriptActionPosition: (actionPosition: BlockPositionActionPosition) => void;
    setFieldsScriptActionPosition: (actionPosition: FieldActionPosition) => void;
};

export class AnimationElementFieldsTimeLines extends React.Component<AnimationElementFieldsTimeLinesProps, {}> {
    public render() {
        const {
            animationElementScript,
            containerWidth,
            setBlockPositionScriptActionPosition,
            setFieldsScriptActionPosition,
        } = this.props;

        const {
            elementName,
            blockPositionScript,
            fieldsScript,
        } = animationElementScript;

        return <>
            { getObjectKeys(blockPositionScript).map((fieldName, i) => {
                const title = BlockPositionFieldTitles[fieldName];
                const unitScript = blockPositionScript[fieldName];

                const {
                    actions,
                } = unitScript;
                const pointPositions = getActionsParams(actions);
                const points: TimeLinePointProps[] = pointPositions.map(({
                                                                             previousActionPosition,
                                                                             position,
                                                                             nextActionPosition,
                                                                         }, actionIndex) => {
                    let movable: TimeLinePointProps['movable'];

                    if (actionIndex > 0) {
                        if (previousActionPosition === undefined) {
                            throw new Error('PointParams without previousPosition value in not first point');
                        }

                        movable = {
                            min: previousActionPosition,
                            max: nextActionPosition === undefined
                                ? 1
                                : nextActionPosition,
                        };
                    }

                    const point: TimeLinePointProps = {
                        position,
                        movable,
                        containerWidth,
                        onPositionChange: (nextPosition) => {
                            setBlockPositionScriptActionPosition({
                                blockPositionFieldName: fieldName,
                                actionIndex,
                                position: nextPosition,
                            });
                        },
                    };

                    return point;
                });

                return <div
                    key={ i }
                    className={ c.AnimationTimelines__TimeLine__padding }
                >
                    <div className={ c.AnimationTimelines__TimeLine__title }>{ title }</div>
                    <UnitScriptTimeLine
                        points={ points }
                        unitScript={ unitScript }
                    />
                </div>;
            }) }
            { getObjectKeys(fieldsScript).map((fieldName, i) => {
                const title = AnimationElementFieldTitles[elementName][fieldName];
                const unitScript = fieldsScript[fieldName];

                const {
                    actions,
                } = unitScript;
                const pointPositions = getActionsParams(actions);
                const points: TimeLinePointProps[] = pointPositions.map(({
                                                                             previousActionPosition,
                                                                             position,
                                                                             nextActionPosition,
                                                                         }, actionIndex) => {
                    let movable: TimeLinePointProps['movable'];

                    if (actionIndex > 0) {
                        if (previousActionPosition === undefined) {
                            throw new Error('PointParams without previousPosition value in not first point');
                        }

                        movable = {
                            min: previousActionPosition,
                            max: nextActionPosition === undefined
                                ? 1
                                : nextActionPosition,
                        };
                    }

                    const point: TimeLinePointProps = {
                        position,
                        movable,
                        containerWidth,
                        onPositionChange: (nextPosition) => {
                            setFieldsScriptActionPosition({
                                fieldName,
                                actionIndex,
                                position: nextPosition,
                            });
                        },
                    };

                    return point;
                });

                return <div
                    key={ i }
                    className={ c.AnimationTimelines__TimeLine__padding }
                >
                    <div className={ c.AnimationTimelines__TimeLine__title }>{ title }</div>
                    <UnitScriptTimeLine
                        points={ points }
                        unitScript={ unitScript }
                    />
                </div>;
            }) }
        </>;
    }
}
