import { getActionsPositions } from '../../../AnimationScript/utils/getActionsPositions';
import { BlockPositionFieldName } from '../../../BlockPosition/BlockPositionFieldName';
import { mapObjectValues } from '../../../utils/mapObjectValues';
import { ConstructorState } from '../State';
import { getEditedAnimationElementScript } from './getEditedAnimationElementScript';
import { setEditedAnimationElementScript } from './setEditedAnimationElementScript';

export function setBlockPositionScriptActionPosition(state: ConstructorState,
                                                     editedBlockPositionFieldName: BlockPositionFieldName,
                                                     actionIndex: number,
                                                     position: number): ConstructorState {
    const animationElementScript = getEditedAnimationElementScript(state);

    const {
        blockPositionScript,
    } = animationElementScript;

    if (actionIndex === 0) {
        throw new Error('It is impossible to change first action position in UnitScript');
    }

    const { actions: blockPositionScriptActions } = blockPositionScript[editedBlockPositionFieldName];

    const actionsPositions = getActionsPositions(blockPositionScriptActions);
    const previousActionPosition = actionsPositions[actionIndex - 1];
    const nextActionPosition = actionsPositions[actionIndex + 1];

    if (position <= previousActionPosition) {
        throw new Error('It is impossible to set action position that less than or equal to previous action position');
    }

    if (nextActionPosition !== undefined) {
        if (position >= nextActionPosition) {
            throw new Error('It is impossible to set action position that greater than or equal to next action position');
        }
    }

    const previousActionDuration = position - previousActionPosition;
    const actionDuration = nextActionPosition === undefined
        ? 1 - position
        : nextActionPosition - position;

    const blockPositionFieldScriptActions = blockPositionScriptActions.map((action, i) => {
        if (i === actionIndex - 1) {
            return {
                ...action,
                duration: previousActionDuration,
            };
        } else if (i === actionIndex) {
            return {
                ...action,
                duration: actionDuration,
            };
        } else {
            return action;
        }
    });

    const nextBlockPositionScript = mapObjectValues(
        blockPositionScript,
        (blockPositionFieldScript, blockPositionFieldName) => {
            if (blockPositionFieldName === editedBlockPositionFieldName) {
                return {
                    ...blockPositionFieldScript,
                    actions: blockPositionFieldScriptActions,
                };
            } else {
                return blockPositionFieldScript as any;
            }
        },
    );

    return setEditedAnimationElementScript(state, {
        ...animationElementScript,
        blockPositionScript: nextBlockPositionScript,
    });
}
