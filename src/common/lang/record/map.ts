// Like Array.map but for records
export const mapRecord = <T extends keyof object, A, B>(
    record: Record<T, A>,
    mapper: (a: A) => B
): Record<T, B> =>
    Object.fromEntries(
        Object.entries(record).map(([key, value]: [T, A]) => [
            key,
            mapper(value)
        ])
    )
