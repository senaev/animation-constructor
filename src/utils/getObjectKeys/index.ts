function getObjectKeysPolyfill<K extends string>(object: Record<K, any>): K[] {
    const keys: K[] = [];

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    return keys;
}

function getObjectKeysNative<K extends string>(object: Record<K, any>): K[] {
    return Object.keys(object) as K[];
}

export const getObjectKeys: <K extends string>(object: Record<K, any>) => K[] = typeof Object.keys === 'function'
    ? getObjectKeysNative
    : getObjectKeysPolyfill;
