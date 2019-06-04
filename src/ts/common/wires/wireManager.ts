import { Singleton } from "@eix/utils";
import { Pin } from "../pin";
import { Wire } from "./wire";
import { svg } from "lit-html";
import { subscribe } from "lit-rx";
import { Subject } from "rxjs";
import { WireStateVal } from "./interface";

@Singleton
export class WireManager {
    public start: Pin
    public end: Pin

    public wires: Wire[] = []

    public update = new Subject<boolean>()

    constructor() { }

    public add(data: Pin) {
        if (data.allowWrite) //output
            this.start = data
        else
            this.end = data

        this.tryResolving()
    }

    public dispose(){
        for (let i of this.wires)
            i.dispose()

        this.wires = []
    }

    public tryResolving() {
        if (this.start && this.end && this.start != this.end) {
            if (this.canBind(this.end)) {
                this.wires.push(new Wire(this.start, this.end))
                this.start = null
                this.end = null
                this.update.next(true)
            }
        }
    }

    private canBind(end: Pin) {
        if (this.wires.find(val => val.output === end))
            return false
        return true
    }

    public remove(target: Wire) {
        target.dispose()
        this.wires = this.wires.filter(val => val !== target)
        this.update.next(true)
    }

    get svg() {
        return this.wires.map(val => {
            const i = val.input.of
            const o = val.output.of
            return svg`
            <line x1=${subscribe(i.pinx(false, 20))}
                x2=${subscribe(o.pinx(true, 20))}
                y1=${subscribe(i.piny(false,i.outputPins.indexOf(val.input)))}
                y2=${subscribe(o.piny(true,o.inputPins.indexOf(val.output)))}
                stroke=${subscribe(val.input.svgColor)}
                stroke-width=10
                @click=${() => this.remove(val)}
            >
            </line>
        `})
    }

    get state() {
        return this.wires.map((val):WireStateVal => ({
            from: {
                owner: val.input.of.id,
                index: val.input.of.outputPins.indexOf(val.input)
            },
            to: {
                owner: val.output.of.id,
                index: val.output.of.inputPins.indexOf(val.output)
            }
        }))
    }
}