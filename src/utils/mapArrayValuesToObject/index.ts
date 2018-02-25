export function mapArrayValuesToObject<K extends string, V>(array: K[],
                                                            mapKeyToValueFunction: (key: K,
                                                                                    array: K[]) => V): Record<K, V> {
    const object = {} as Record<K, V>;

    for (let i = 0; i < array.length; i++) {
        const key = array[i];
        object[key] = mapKeyToValueFunction(key, array);
    }

    return object;
}
