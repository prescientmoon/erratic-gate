/**
 * Makes the first char of a string uppercase
 *
 * @param name The string to convert
 */
export const firstCharUpperCase = (name: string) =>
    `${name[0].toUpperCase()}${name.substr(1)}`
