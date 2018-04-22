type Primitive =
    | undefined
    | null
    | string
    | number
    | boolean;

export function isObject <T extends Record<string, any>> (value: T | Primitive): value is T {
    return Boolean(value) && typeof value === 'object';
}
