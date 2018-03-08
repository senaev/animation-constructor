import { Unit } from '../Unit/Unit';
import { AnimationElements } from './AnimationElements';

export const AnimationElementsFieldsUnits = {
    [AnimationElements.Rectangle]: {
        // cast types to have a particular type for each property
        backgroundColor: Unit.color as Unit.color,
        borderRadius: Unit.percent as Unit.percent,
    },
};
export type AnimationElementsFieldsUnits = typeof AnimationElementsFieldsUnits;
