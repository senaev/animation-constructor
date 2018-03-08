function getObjectKeysPolyfill<T extends Record<string, any>>(object: T): (keyof T)[] {
    const keys = [];

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    return keys;
}

function getObjectKeysNative<T extends Record<string, any>>(object: T): (keyof T)[] {
    return Object.keys(object);
}

export const getObjectKeys: <T extends Record<string, any>>(object: T) => (keyof T)[]
    = typeof Object.keys === 'function'
    ? getObjectKeysNative
    : getObjectKeysPolyfill;
