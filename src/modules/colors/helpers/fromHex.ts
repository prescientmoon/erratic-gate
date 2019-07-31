/**
 * Gets the 3 chunks frmo a hex color string
 *
 * @param color The color string
 */
export const fromHexColorString = (color: string) => {
    const actual = color.slice(1)

    const chunks = [
        actual.substr(0, 2),
        actual.substr(2, 2),
        actual.substr(4, 2)
    ]

    const numbers = chunks.map(chunk => parseInt(chunk, 16))

    return numbers
}

/**
 * Rebuilds a color from its chunks
 */
export const fromChunks = (chunks: number[]) => {
    return `#${chunks.reduce((acc, curr) => {
        const stringified = curr.toString(16)
        return (
            acc + (stringified.length === 1 ? `0${stringified}` : stringified)
        )
    }, '')}`
}
