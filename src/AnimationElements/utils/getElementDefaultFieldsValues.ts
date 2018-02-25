import { mapObjectValues } from '../../utils/mapObjectValues';
import { AllAnimationElementsDescriptions } from '../AllAnimationElementsDescriptions';
import { AnimationElementsFieldsValues } from '../AnimationElementFields';
import { AnimationElementName } from '../AnimationElementName';

export function getElementDefaultFieldsValues<T extends AnimationElementName>(animationElementName: T): AnimationElementsFieldsValues {
    const fieldsDescriptions = AllAnimationElementsDescriptions[animationElementName];

    return mapObjectValues(fieldsDescriptions, ({ value }) => value);
}
