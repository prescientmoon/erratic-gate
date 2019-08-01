export function* allCombinations<T>(first: T[], second: T[]): Iterable<[T, T]> {
    for (const item of first) {
        // TODO: change name
        for (const element of second) {
            yield [item, element]
        }
    }
}

export const recursiveCombinations = <T>(values: T[], depth = 2) => {
    if (depth === 0) {
        return [[]]
    }

    const combinations: T[][] = []

    for (const value of values) {
        for (const combination of recursiveCombinations(values, depth - 1)) {
            combinations.push([value, ...combination])
        }
    }

    return combinations
}
