import { AnimationElementFieldsNames } from './AnimationElementFieldsNames';
import { AnimationElements } from './AnimationElements';

export const AnimationElementFieldTitles: {
    [elementName in AnimationElements]: {
    [key in AnimationElementFieldsNames<elementName>]: string;
    };
    } = {
    [AnimationElements.Rectangle]: {
        backgroundColor: 'Цвет заливки',
        borderRadius: 'Радиус скругления',
    },
};
