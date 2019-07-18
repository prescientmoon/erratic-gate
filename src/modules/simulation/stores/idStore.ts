import { LocalStore } from '../../storage/classes/LocalStore'

const store = new LocalStore<number>('id')

export const idStore = {
    generate() {
        const current = store.get()
        store.set(current + 1)

        return current + 1
    }
}
