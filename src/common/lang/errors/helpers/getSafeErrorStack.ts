export const getSafeErrorStack = (error: any) => {
    const errorString: string = error.toString()
    const stackString: string = error.stack

    if (stackString) {
        const safeStackString =
            stackString.replace(errorString + '\n', '') || stackString

        const stackItems = safeStackString.split('\n')
        const safeStackItems = stackItems
            .map(item => item.replace('    at ', ''))
            .filter(item => item !== '')
            .map(item => `  at ${item}`)

        const safeStack = safeStackItems.join('\n')

        return `${errorString}\n${safeStack}`
    }

    return errorString
}
