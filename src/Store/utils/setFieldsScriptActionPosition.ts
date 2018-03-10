import { AnimationElementFieldsNames } from '../../AnimationElements/AnimationElementFieldsNames';
import { AnimationElementName } from '../../AnimationElements/AnimationElementName';
import { ConstructorState } from '../State';
import { getEditedAnimationElementScript } from './getEditedAnimationElementScript';
import { setEditedAnimationElementScript } from './setEditedAnimationElementScript';
import { setFieldsScriptsActionPosition } from './setFieldsScriptsActionPosition';

export function setFieldsScriptActionPosition(state: ConstructorState,
                                              fieldName: AnimationElementFieldsNames<AnimationElementName>,
                                              actionIndex: number,
                                              position: number): ConstructorState {
    const animationElementScript = getEditedAnimationElementScript(state);

    const fieldsScript = setFieldsScriptsActionPosition(
        animationElementScript.fieldsScript,
        fieldName,
        actionIndex,
        position,
    );

    return setEditedAnimationElementScript(state, {
        ...animationElementScript,
        fieldsScript,
    });
}
