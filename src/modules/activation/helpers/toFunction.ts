/**
 * Transforms js code into a function
 *
 * @param source tThe js code
 * @param args The name of arguments to pass to the function
 */
export const toFunction = <T extends unknown[]>(
    source: string,
    ...args: string[]
): ((...args: T) => void) => {
    const raw = `return (${args.join(',')}) => {
        ${source}
    }`

    return new Function(raw)()
}
