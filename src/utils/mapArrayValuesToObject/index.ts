export function mapArrayValuesToObject<K extends string, V>(array: K[],
                                                            mapKeyToValueFunction: (key: K,
                                                                                    array: K[]) => V): Record<K, V> {
    const object = {} as Record<K, V>;

    for (const key of array) {
        object[key] = mapKeyToValueFunction(key, array);
    }

    return object;
}
