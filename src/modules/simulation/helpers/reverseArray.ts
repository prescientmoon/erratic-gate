export const reverseArray = <T>(array: T[]) => {
    const arr: T[] = []

    for (let index = array.length - 1; index >= 0; index--) {
        const element = array[index]
        arr.push(element)
    }

    return arr
}
