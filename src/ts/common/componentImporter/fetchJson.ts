export const fecthAsJson = async <T>(url: string) => {
    const res = await fetch(url)
    const json = await res.json()

    return json as T
}
