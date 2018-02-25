import { mapObjectValues } from '../../utils/mapObjectValues';
import { AllAnimationElementsDescriptions } from '../AllAnimationElementsDescriptions';
import { AnimationElementsFieldsTypes } from '../AnimationElementFields';
import { AnimationElementName } from '../AnimationElementName';

// tslint:disable-next-line:max-line-length
export function getElementDefaultFieldsValues<T extends AnimationElementName>(animationElementName: T): AnimationElementsFieldsTypes[T] {
    const fieldsDescriptions = AllAnimationElementsDescriptions[animationElementName];

    return mapObjectValues(fieldsDescriptions, ({ value }) => value);
}
