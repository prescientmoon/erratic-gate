export interface Context {
    memory: Record<string, unknown>
    get: (index: number) => boolean
    set: (index: number, state: boolean) => void
}
