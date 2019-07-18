import { CacheInstancesByKey } from '@eix-js/utils'

@CacheInstancesByKey(Infinity)
export class LocalStore<T> {
    public constructor(public name: string) {
        if (!localStorage.getItem(name)) {
            localStorage.setItem(name, '{}')
        }
    }

    public getAll(): Record<string, T> {
        const raw = localStorage.getItem(this.name)

        if (!raw)
            throw new Error(
                `An error occured when accesing ${
                    this.name
                } in the local storage!`
            )
        else {
            return JSON.parse(raw)
        }
    }

    public ls(): string[] {
        return Object.keys(this.getAll())
    }

    public *[Symbol.iterator](): Iterable<T> {
        for (const item of this.ls()) {
            return this.get(item)
        }
    }

    public get(key = 'index') {
        return this.getAll()[key]
    }

    public set(key: string | T = 'index', value?: T) {
        if (typeof key !== 'string' || value === undefined) {
            localStorage.setItem(
                this.name,
                JSON.stringify({
                    index: key
                })
            )
        } else {
            localStorage.setItem(
                this.name,
                JSON.stringify({
                    [key]: value
                })
            )
        }
    }
}
