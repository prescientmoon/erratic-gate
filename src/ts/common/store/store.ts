export class Store<T> {
    constructor(private name: string){ }

    get(key:string):T{
        const data = localStorage[`${this.name}/${key}`]
        
        if(data)
            return JSON.parse(data).value
        
        return null
    }

    set(key:string,value:T){
        localStorage[`${this.name}/${key}`] = JSON.stringify({ value })
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