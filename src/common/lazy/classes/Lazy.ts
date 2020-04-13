export class Lazy<T> {
    private value: T | null = null

    /**
     * SImple encoding of lazy values
     * @param getter a function o get the lazy value
     */
    public constructor(private getter: () => T) {}

    public get(value) {
        if (this.value === null) {
            this.value = this.getter()
        }

        return this.value
    }
}
