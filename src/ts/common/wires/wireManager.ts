import { Singleton } from '@eix/utils'
import { Pin } from '../pin'
import { Wire } from './wire'
import { svg } from 'lit-html'
import { subscribe } from 'lit-rx'
import { Subject, combineLatest } from 'rxjs'
import { WireStateVal } from './interface'
import { merge, map } from 'rxjs/operators'

@Singleton
export class WireManager {
    public start: Pin
    public end: Pin

    public wires: Wire[] = []

    public update = new Subject<boolean>()

    constructor() {}

    public add(data: Pin) {
        if (data.allowWrite)
            //output
            this.start = data
        else this.end = data

        this.tryResolving()
    }

    public dispose() {
        for (let i of this.wires) i.dispose()

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
        if (this.wires.find(val => val.output === end)) return false
        return true
    }

    public remove(target: Wire) {
        target.dispose()
        this.wires = this.wires.filter(val => val !== target)
        this.update.next(true)
    }

    get svg() {
        return svg`${this.wires.map(val => {
            const i = val.input.of
            const o = val.output.of
            const inputIndex = i.outputPins.indexOf(val.input)
            const inputY = i.piny(false, inputIndex)
            const outputY = o.piny(true, o.inputPins.indexOf(val.output))

            const output = [o.pinx(true, 20), outputY]
            const input = [i.pinx(false, 20), inputY]
            const midX = combineLatest(output[0], input[0]).pipe(
                map(values => {
                    return (values[0] + values[1]) / 2
                })
            )

            const mid1 = [midX, outputY]
            const mid2 = [midX, inputY]

            const d = combineLatest<number[]>(
                ...output,
                ...mid1,
                ...mid2,
                ...input
            ).pipe(
                map(
                    points =>
                        `M ${points.slice(0, 2).join(' ')} C ${points
                            .slice(2)
                            .join(' ')}`
                )
            )

            return svg`
            <path d=${subscribe(d)}  
                stroke=${subscribe(val.input.svgColor)}
                stroke-width=10 
                fill="rgba(0,0,0,0)"
                @click=${() => this.remove(val)} />
        `
        })}`
    }

    get state() {
        return this.wires.map(
            (val): WireStateVal => ({
                from: {
                    owner: val.input.of.id,
                    index: val.input.of.outputPins.indexOf(val.input)
                },
                to: {
                    owner: val.output.of.id,
                    index: val.output.of.inputPins.indexOf(val.output)
                }
            })
        )
    }
}
