export function areArraysEqual<T>(firstArray: T[], secondArray: T[]): boolean {
    if (firstArray.length !== secondArray.length) {
        return false;
    }

    for (let i = 0; i < firstArray.length; i++) {
        if (firstArray[i] !== secondArray[i]) {
            return false;
        }
    }

    return true;
}
