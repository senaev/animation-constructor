import * as React from 'react';
import { AnimationElementFieldTitles } from '../../../AnimationElements/AnimationElementFieldTitles';
import { AnimationElementName } from '../../../AnimationElements/AnimationElementName';
import { AnimationElementScript } from '../../../AnimationScript';
import { BlockPositionFieldTitles } from '../../../BlockPosition/BlockPositionFieldTitles';
import { getObjectKeys } from '../../../utils/getObjectKeys';
import * as c from '../AnimationTimelines/index.pcss';
import { UnitScriptTimeLine } from '../UnitScriptTimeLine';

export type AnimationElementFieldsTimeLinesProps = {
    animationElementScript: AnimationElementScript<AnimationElementName>;
};

export class AnimationElementFieldsTimeLines extends React.Component<AnimationElementFieldsTimeLinesProps, {}> {
    public render() {
        const {
            elementName,
            blockPositionScript,
            fieldsScript,
        } = this.props.animationElementScript;

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
                        onMovePointStart={ (params) => {
                            console.log('start', params);
                        } }
                        onMovePoint={ (params) => {
                            console.log('move', params);
                        } }
                        onMovePointEnd={ (params) => {
                            console.log('end', params);
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
