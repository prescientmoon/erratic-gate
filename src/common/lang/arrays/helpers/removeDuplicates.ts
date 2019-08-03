/**
 * Remoes al lduplicates from array
 *
 * @param array The array to remove duplicates from
 */
export const removeDuplicates = <T>(array: T[]): T[] =>
    Array.from(new Set<T>(array).values())
