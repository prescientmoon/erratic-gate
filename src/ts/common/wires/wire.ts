import { Pin } from "../pin";

export class Wire {
    constructor (public input:Pin,public output:Pin){
        this.output.bindTo(this.input)
        this.input.pairs.push(this.output)
        this.input.update()
        this.output.update()
    }

    public dispose(){
        this.output.setValue(0)
        this.output.unbind(this.input)
        this.input.unbind(this.output)
        this.input.update()
        this.output.update()
    }
}