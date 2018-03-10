import { ScriptAction } from '../';
import { Unit } from '../../Unit/Unit';

export function getActionsPositions(actions: ScriptAction<Unit>[]): number[] {

    let durationSum = 0;

    return actions.map(({ duration }) => {
        const position = durationSum;
        durationSum += duration;

        return position;
    });
}
