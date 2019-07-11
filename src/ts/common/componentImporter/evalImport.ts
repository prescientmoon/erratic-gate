import { fecthAsJson } from './fetchJson'
import { getFirstFileFromGist, getGist } from './getGist'

export const evalImport = async <T>(
    command: string,
    extension = 'json'
): Promise<T> => {
    const words = command.split(' ')

    let final: T

    if (words.length === 1) {
        if (extension === 'json') {
            final = await fecthAsJson<T>(command)
        } else {
            final = ((await (await fetch(command)).text()) as unknown) as T
        }
    } else if (words[0] === 'gist') {
        final = getFirstFileFromGist(await getGist(words[1]), extension)
    }

    return final
}
