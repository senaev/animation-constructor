import { AnimationElementFieldsNames } from './AnimationElementFieldsNames';
import { AnimationElementFieldsTypes } from './AnimationElementFieldsTypes';
import { AnimationElements } from './AnimationElements';

export type AnimationElementFieldsValues<T extends AnimationElements> =
    AnimationElementFieldsTypes<T>[AnimationElementFieldsNames<T>];
