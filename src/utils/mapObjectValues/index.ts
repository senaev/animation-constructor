import { getObjectKeys } from '../getObjectKeys';

export function mapObjectValues<K extends string, V, R>(object: Record<K, V>,
                                                        mapFunction: (value: V, key: K) => R): Record<K, R> {
    const resultObject = {} as Record<K, R>;

    getObjectKeys(object).forEach((key) => {
        resultObject[key] = mapFunction(object[key], key);
    });

    return resultObject;
}
