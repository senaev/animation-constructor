import { getObjectKeys } from '../getObjectKeys';

export function mapObjectValues<
    InputType extends Record<string, any>,
    OutputType extends Record<keyof InputType, any>
>(
    object: InputType,
    mapFunction: <T extends keyof InputType>(value: InputType[T], key: T) => OutputType[T]): OutputType {
    const resultObject = {} as OutputType;

    getObjectKeys(object).forEach((key) => {
        resultObject[key] = mapFunction(object[key], key);
    });

    return resultObject;
}
