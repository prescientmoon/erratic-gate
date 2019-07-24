export const removeDuplicates = <T>(array: T[]): T[] =>
    Array.from(new Set<T>(array).values())
