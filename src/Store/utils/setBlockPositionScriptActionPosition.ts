import { BlockPositionFieldName } from '../../BlockPosition/BlockPositionFieldName';
import { ConstructorState } from '../State';
import { getEditedAnimationElementScript } from './getEditedAnimationElementScript';
import { setEditedAnimationElementScript } from './setEditedAnimationElementScript';
import { setFieldsScriptsActionPosition } from './setFieldsScriptsActionPosition';

export function setBlockPositionScriptActionPosition(state: ConstructorState,
                                                     editedBlockPositionFieldName: BlockPositionFieldName,
                                                     actionIndex: number,
                                                     position: number): ConstructorState {
    const animationElementScript = getEditedAnimationElementScript(state);

    const blockPositionScript = setFieldsScriptsActionPosition(
        animationElementScript.blockPositionScript,
        editedBlockPositionFieldName,
        actionIndex,
        position,
    );

    return setEditedAnimationElementScript(state, {
        ...animationElementScript,
        blockPositionScript,
    });
}
