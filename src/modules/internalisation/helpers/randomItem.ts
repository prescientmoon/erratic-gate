/**
 * Returns a random element of the aray
 *
 * @param arr - the array to choose from
 */
export const randomItem = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)]
