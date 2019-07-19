export const toFunction = <T extends unknown[]>(
    source: string,
    ...args: string[]
): ((...args: T) => void) => {
    return new Function(`return (${args.join(',')}) => {
        ${source}
    }`)()
}
