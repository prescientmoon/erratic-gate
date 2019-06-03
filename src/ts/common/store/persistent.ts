import { Store } from "./store";

export const persistent = <T,K>(_default:K,storeKey = "main") => (target:T, key: keyof T & string) => {
    let secret: K
    const store = new Store<K>(key)
    if (store.get(storeKey))
        secret = store.get(storeKey)
    else
        secret = _default

    Object.defineProperty(target,key,{
        get() {
            return secret
        },
        set(value:K) {
            secret = value
            store.set(storeKey, secret)
        },
        enumerable: true
    })
}