import { mapObjectValues } from '../../utils/mapObjectValues';
import { AllAnimationElementsDescriptions } from '../AllAnimationElementsDescriptions';
import { AnimationElementName } from '../AnimationElementName';
import { AnimationElementFieldsValues } from '../AnimationElementsFieldsValues';

export function getElementDefaultFieldsValues<T extends AnimationElementName>(animationElementName: T): AnimationElementFieldsValues {
    const fieldsDescriptions = AllAnimationElementsDescriptions[animationElementName];

    return mapObjectValues(fieldsDescriptions, ({ value }) => value);
}
