/**
 * Removes element from array efficiently
 * Based on a gist by the creator of rollup.
 *
 * @param arr The array to remove the element from
 * @param element The element to remove
 */
export const removeElement = <T>(arr: T[], element: T) => {
    const index = arr.indexOf(element)
    arr[index] = arr[arr.length - 1]
    return arr.pop()
}
