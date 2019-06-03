import { BehaviorSubject } from "rxjs";

export class Store<T> {
    public lsChanges = new BehaviorSubject<string[]>([])

    constructor(private name: string){
        this.update()
    }

    update(){
        this.lsChanges.next(this.ls())
    }

    get(key:string):T{
        const data = localStorage[`${this.name}/${key}`]

        if(data)
            return JSON.parse(data).value

        return null
    }

    delete(key:string){
        localStorage.removeItem(`${this.name}/${key}`)
        this.update()
    }

    set(key:string,value:T){
        localStorage[`${this.name}/${key}`] = JSON.stringify({ value })

        this.update()
        return this
    }

    ls() {
        let keys = []

        for (const i in localStorage){
            if (i.indexOf(this.name) == 0)
                keys.push(i.substr(this.name.length + 1))
        }

        return keys
    }
}