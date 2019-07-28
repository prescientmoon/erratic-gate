/**
 * Repeats an element a number of times
 *
 * @param element The element to repeat a number of times
 * @param count The number of times to repeat the element
 */
export const repeat = <T>(element: T, count = 1): T[] =>
    [...Array(count)].fill(element)
