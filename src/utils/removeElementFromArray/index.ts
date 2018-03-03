export function removeElementFromArray<T>(array: T[], index: number): T[] {
    const nextArray = [...array];
    nextArray.splice(index, 1);
    return nextArray;
}
