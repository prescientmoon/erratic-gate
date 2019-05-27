import { Vector } from "prelude-ts"
import { Subject, BehaviorSubject, Subscription, timer } from "rxjs";
import { ComponentState, activationContext } from "./interfaces";
import { map, debounce } from "rxjs/operators";
import { Screen } from "../screen.ts";
import { ComponentTemplateStore } from "../componentManager/componentTemplateStore";
import { svg } from "lit-html";
import { subscribe } from "lit-rx";
import { Pin } from "../pin";
import { success, error } from "toastr"
import { alertOptions } from "../componentManager/alertOptions";
import { WireManager } from "../wires";
import { runCounter } from "./runCounter";

export class Component {
    private static store = new ComponentTemplateStore()
    private static screen = new Screen()
    private static wireManager = new WireManager()
    private static lastId = runCounter.get() + 1

    public position = new BehaviorSubject<number[]>(null)
    public scale = new BehaviorSubject<number[]>(null)
    public clicked = false

    private mouserDelta: number[]
    private strokeColor = "#888888"
    private inputs: number
    private outputs: number
    private activation: (ctx: activationContext) => any
    private subscriptions:Subscription[] = []

    public inputPins: Pin[] = []
    public outputPins: Pin[] = []

    public id: number

    constructor(private template: string,
        position: [number, number] = [0, 0],
        scale: [number, number] = [0, 0],
        id? : number) {

        //set initial props
        this.position.next(position)
        this.scale.next(scale)

        //set the correct id
        this.id = (typeof id === "number") ? id : Component.lastId++

        //load template
        const data = Component.store.store.get(template)

        if (!data)
            throw new Error(`Template ${template} doesnt exist`)

        this.inputs = data.inputs
        this.outputs = data.outputs

        this.inputPins = [...Array(this.inputs)].fill(true).map(val => new Pin(false, this))
        this.outputPins = [...Array(this.outputs)].fill(true).map(val => new Pin(true, this))

        this.activation = new Function(`return (ctx) => {
            try{
                ${data.activation}
            }
            catch(err){
                ctx.error(err,"",ctx.alertOptions)
            }
        }`)()

        this.inputPins.forEach(val => {
            const subscription = val.valueChanges.pipe(debounce(() => timer(1000 / 60)))
                .subscribe(val => this.activate())
            this.subscriptions.push(subscription)
        })

        this.activate()
    }

    public dispose(){
        this.subscriptions.forEach(val => val.unsubscribe())
    }

    public handleMouseUp(e: MouseEvent) {
        this.clicked = false
    }

    private activate() {
        this.activation({
            outputs: this.outputPins,
            inputs: this.inputPins,
            succes: (mes: string) => { success(mes, "", alertOptions) },
            error: (mes: string) => { error(mes, "", alertOptions) }
        } as activationContext)
    }

    move(e: MouseEvent) {
        const mousePosition = Component.screen.getWorldPosition(e.clientX, e.clientY)
        this.position.next(mousePosition.map((value, index) =>
            value - this.mouserDelta[index]
        ))
    }

    handleClick(e: MouseEvent) {
        const mousePosition = Component.screen.getWorldPosition(e.clientX, e.clientY)

        this.mouserDelta = this.position.value.map((value, index) =>
            mousePosition[index] - value
        )
        this.clicked = true
    }

    handlePinClick(e: MouseEvent, pin: Pin) {
        Component.wireManager.add(pin)
    }

    get state(): ComponentState {
        return {
            position: this.position.value as [number, number],
            scale: this.scale.value as [number, number],
            template: this.template,
            id: this.id
        }
    }

    get x() {
        return this.position.pipe(map(val =>
            val[0]
        ))
    }
    get y() {
        return this.position.pipe(map(val =>
            val[1]
        ))
    }

    get width() {
        return this.scale.pipe(map(val =>
            val[0]
        ))
    }
    get height() {
        return this.scale.pipe(map(val =>
            val[1]
        ))
    }

    pinsSvg(pinScale: number, pinLength = 20, mode = "input") {
        const stroke = 3

        return ((mode === "input") ? this.inputPins : this.outputPins)
            .map((val, index) => {
                const y = subscribe(this.piny(mode === "input",index))

                const x = subscribe(this.pinx(mode === "input",pinLength))

                const linex = subscribe(this.x.pipe(map(val =>
                    val + ((mode === "input") ? -pinLength : pinLength + this.scale.value[0])
                )))

                const middleX = subscribe(this.x.pipe(map(val =>
                    val + this.scale.value[0] / 2
                )))

                return svg`
                    <line stroke=${this.strokeColor} y1=${y} y2=${y}
                    x1=${(mode === "input") ? linex : middleX}
                    x2=${(mode !== "input") ? linex : middleX} 
                    stroke-width=${stroke}></line>
                    
                    <circle fill=${subscribe(val.svgColor)} 
                    stroke=${this.strokeColor}
                    r=${pinScale}
                    cx=${x}
                    cy=${y} stroke-width=${stroke}
                    @click=${(e: MouseEvent) => this.handlePinClick(e, val)}
                    ></circle>
                `})
    }

    public pinx(mode = true, pinLength = 15){
        return this.x.pipe(
            map(val => val + (
                (mode) ?
                    -pinLength :
                    this.scale.value[0] + pinLength
            ))
        )
    }

    public piny(mode = true, index: number){
        const space = this.scale.value[1] / (mode ? this.inputs : this.outputs)
        return this.y.pipe(
            map(val => val + space * (2 * index + 1) / 2)
        )
    }

    static fromState(state: ComponentState) {
        return new Component(state.template, state.position, state.scale, state.id)
    }
}