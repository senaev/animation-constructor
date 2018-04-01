export type Mirror<T extends string> = {
    [key in T]: key;
};
