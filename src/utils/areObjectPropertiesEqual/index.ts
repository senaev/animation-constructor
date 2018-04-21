import { getObjectKeys } from '../getObjectKeys';

export function areObjectPropertiesEqual<T extends Record<string, any>>(firstObject: T,
                                                                        secondObject: T): boolean {
    const firstKeys = getObjectKeys(firstObject);
    const secondKeys = getObjectKeys(secondObject);

    // objects has different own properties count
    if (firstKeys.length !== secondKeys.length) {
        return false;
    }

    for (const key of firstKeys) {
        // second object does not have the same key in own props
        if (!secondObject.hasOwnProperty(key)) {
            return false;
        }

        // second object has different value in the same key
        if (firstObject[key] !== secondObject[key]) {
            return false;
        }
    }

    return true;
}
