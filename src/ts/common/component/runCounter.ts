import { Store } from "../store";

export const runCounter = {
    store: new Store<number>("runCounter"),
    get(){
        return runCounter.store.get("main")
    },
    increase(){
        runCounter.store.set("main", runCounter.store.get("main") + 1)
    }
}

if (!runCounter.get())
    runCounter.store.set("main",1)