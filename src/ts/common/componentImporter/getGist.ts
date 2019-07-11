import { fecthAsJson } from './fetchJson'

export interface Gist {
    files: Record<string, { content: string }>
}

export const getGist = async (id: string) => {
    const url = `https://api.github.com/gists/${id}`
    const json = await fecthAsJson<Gist>(url)

    return json
}

export const getFirstFileFromGist = (gist: Gist, extension = 'json') => {
    const content =
        gist.files[
            Object.keys(gist.files).find(
                name => name.indexOf(`.${extension}`) !== -1
            )
        ].content

    if (extension === 'json') {
        return JSON.parse(content)
    }

    return content
}
