export function* allCombinations<T>(first: T[], second: T[]): Iterable<[T, T]> {
    for (const item of first) {
        // TODO: change name
        for (const element of second) {
            yield [item, element]
        }
    }
}
