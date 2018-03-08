import { DefaultColor } from '../Color/DefaultColor';
import { AnimationElementFieldsTypes } from './AnimationElementFieldsTypes';
import { AnimationElementName } from './AnimationElementName';
import { AnimationElements } from './AnimationElements';

export const AnimationElementsDefaultValues: {
    [elementName in AnimationElementName]: AnimationElementFieldsTypes<elementName>
    } = {
    [AnimationElements.Rectangle]: {
        backgroundColor: DefaultColor,
        borderRadius: 0,
    },
};
