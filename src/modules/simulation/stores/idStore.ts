import { LocalStore } from '../../storage/classes/LocalStore'

const store = new LocalStore<number>('id')

export const idStore = {
    generate() {
        const current = store.get()

        if (current === undefined) {
            store.set(1)
            return 1
        }

        store.set(current + 1)

        return current + 1
    }
}
