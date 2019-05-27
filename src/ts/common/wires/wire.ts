import { Pin } from "../pin";

export class Wire {
    constructor (public input:Pin,public output:Pin){
        this.output.bindTo(this.input)
        this.input.pair = this.output
        this.input.update()
        this.output.update()
    }

    public dispose(){
        this.output.unbind(this.input)
        this.input.pair = null
    }
}