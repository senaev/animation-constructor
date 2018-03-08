import { AnimationElementFieldsNames } from './AnimationElementFieldsNames';
import { AnimationElementFieldsTypes } from './AnimationElementFieldsTypes';
import { AnimationElementName } from './AnimationElementName';

export type AnimationElementFieldsValues<T extends AnimationElementName> =
    AnimationElementFieldsTypes<T>[AnimationElementFieldsNames<T>];
