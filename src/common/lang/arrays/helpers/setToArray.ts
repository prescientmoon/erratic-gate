/**
 * Transforms a set into an array
 *
 * @param set The set to convert
 */
export const setToArray = <T>(set: Set<T>) => Array.from(set.values())
