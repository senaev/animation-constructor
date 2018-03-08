import { AnimationElementFieldsNames } from './AnimationElementFieldsNames';
import { AnimationElementName } from './AnimationElementName';
import { AnimationElements } from './AnimationElements';

export const AnimationElementFieldTitles: {
    [elementName in AnimationElementName]: {
    [key in AnimationElementFieldsNames<elementName>]: string;
    };
    } = {
    [AnimationElements.Rectangle]: {
        backgroundColor: 'Цвет заливки',
        borderRadius: 'Радиус скругления',
    },
};
