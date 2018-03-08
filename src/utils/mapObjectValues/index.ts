import { getObjectKeys } from '../getObjectKeys';

export function mapObjectValues<O extends Record<string, any>, R>(object: O,
                                                                  mapFunction: (value: O[keyof O],
                                                                                key: keyof O) => R): Record<keyof O, R> {
    const resultObject = {} as Record<keyof O, R>;

    getObjectKeys(object).forEach((key) => {
        resultObject[key] = mapFunction(object[key], key);
    });

    return resultObject;
}
