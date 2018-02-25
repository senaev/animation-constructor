export function repeat<T>(count: number, callback: (iterationNumber: number) => T): T[] {
    const result: T[] = [];

    for (let iterationNumber = 0; iterationNumber < count; iterationNumber++) {
        result.push(callback(iterationNumber));
    }

    return result;
}
