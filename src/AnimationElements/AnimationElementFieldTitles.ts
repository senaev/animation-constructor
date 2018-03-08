import { AnimationElementFieldsNames } from './AnimationElementFieldsNames';
import { AnimationElementName } from './AnimationElementName';

export const AnimationElementFieldTitles: {
    [elementName in AnimationElementName]: {
    [key in AnimationElementFieldsNames<elementName>]: string;
    };
    } = {
    Rectangle: {
        backgroundColor: 'Цвет заливки',
        borderRadius: 'Радиус скругления',
    },
};
