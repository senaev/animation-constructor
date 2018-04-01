import { mapObjectValues } from '../mapObjectValues';
import { Mirror } from './Mirror';

export function mirrorObject<T extends Record<string, any>>(object: T): Mirror<keyof T> {
    return mapObjectValues(object, (value, key) => key) as Mirror<keyof T>;
}
