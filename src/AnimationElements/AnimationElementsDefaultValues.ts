import { DefaultColor } from '../Color/DefaultColor';
import { AnimationElementFieldsTypes } from './AnimationElementFieldsTypes';
import { AnimationElements } from './AnimationElements';

export const AnimationElementsDefaultValues: {
    [elementName in AnimationElements]: AnimationElementFieldsTypes<elementName>
    } = {
    [AnimationElements.Rectangle]: {
        backgroundColor: DefaultColor,
        borderRadius: 0,
    },
};
