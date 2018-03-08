import { DefaultColor } from '../Color/DefaultColor';
import { AnimationElementFieldsTypes } from './AnimationElementFieldsTypes';
import { AnimationElementName } from './AnimationElementName';

export const AnimationElementsDefaultValues: {
    [elementName in AnimationElementName]: AnimationElementFieldsTypes<elementName>
    } = {
    Rectangle: {
        backgroundColor: DefaultColor,
        borderRadius: 0,
    },
};
