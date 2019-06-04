import { BehaviorSubject, Subscription, timer } from "rxjs";
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
import { Material } from "./material";
import { manager } from "../../main";

export class Component {
    private static store = new ComponentTemplateStore()
    private static screen = new Screen()
    private static wireManager = new WireManager()

    public position = new BehaviorSubject<number[]>(null)
    public scale = new BehaviorSubject<number[]>(null)
    public clicked = false
    public id: number
    public material: Material
    public clickedChanges = new BehaviorSubject(false)

    private mouserDelta: number[]
    private strokeColor = "#888888"
    private inputs: number
    private outputs: number
    private activation: ((ctx: activationContext) => any)[] = []
    private subscriptions: Subscription[] = []

    public inputPins: Pin[] = []
    public outputPins: Pin[] = []

    constructor(private template: string,
        position: [number, number] = [0, 0],
        scale: [number, number] = [0, 0],
        id?: number) {

        //set initial props
        this.position.next(position)
        this.scale.next(scale)

        //set the correct id
        this.id = (typeof id === "number") ? id : Component.getId()

        //load template
        const data = Component.store.store.get(template)

        if (!data)
            throw new Error(`Template ${template} doesnt exist`)

        this.inputs = data.inputs
        this.outputs = data.outputs

        this.inputPins = [...Array(this.inputs)].fill(true).map(() => new Pin(false, this))
        this.outputPins = [...Array(this.outputs)].fill(true).map(() => new Pin(true, this))

        this.activation = [data.activation, data.onclick ? data.onclick : ""]
            .map(val => {
                return new Function(`return (ctx) => {
                    try{
                        ${val}
                    }
                    catch(err){
                        ctx.error(err,"",ctx.alertOptions)
                    }
                }`)()
            })

        this.inputPins.forEach(val => {
            const subscription = val.valueChanges.pipe(debounce(() => timer(1000 / 60)))
                .subscribe(() => this.activate())
            this.subscriptions.push(subscription)
        })

        this.material = new Material(data.material.mode, data.material.data)
        this.activate()
    }

    public dispose() {
        this.subscriptions.forEach(val => val.unsubscribe())
    }

    public handleMouseUp() {
        this.clicked = false
        this.clickedChanges.next(this.clicked)
    }

    private activate(index: number = 0) {
        this.activation[index]({
            outputs: this.outputPins,
            inputs: this.inputPins,
            succes: (mes: string) => { success(mes, "", alertOptions) },
            error: (mes: string) => { error(mes, "", alertOptions) },
            color: (color: string) => {
                this.material.color.next(color)
            }
        } as activationContext)
    }

    move(e: MouseEvent) {
        const mousePosition = Component.screen.getWorldPosition(e.clientX, e.clientY)
        this.position.next(mousePosition.map((value, index) =>
            value - this.mouserDelta[index]
        ))
    }

    handleClick(e: MouseEvent) {
        console.log(e.button)

        if (e.button === 0) {
            const mousePosition = Component.screen.getWorldPosition(e.clientX, e.clientY)

            this.mouserDelta = this.position.value.map((value, index) =>
                mousePosition[index] - value
            )
            this.clicked = true
            this.clickedChanges.next(this.clicked)

            this.activate(1)
            this.activate(0)
        }

        else if (e.button === 2) {
            // setTimeout(() => {
                console.log("removed")
                manager.components = manager.components.filter(({ id }) => id !== this.id)
                manager.update()

                manager.wireManager.wires
                    .filter(val => val.input.of.id == this.id || val.output.of.id == this.id)
                    .forEach(val => {
                        manager.wireManager.remove(val)
                    })
                // manager.to

                console.log("removed 1")

                manager.wireManager.update.next(true)

                console.log("removed 2")

                manager.update()

                console.log("removed 3")
                console.log(manager.components)
                console.log(manager.wireManager)
            // }, 0)
        }
    }

    handlePinClick(pin: Pin) {
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
                const y = subscribe(this.piny(mode === "input", index))

                const x = subscribe(this.pinx(mode === "input", pinLength))

                const linex = subscribe(this.x.pipe(map(val =>
                    val + ((mode === "input") ? -pinLength : pinLength + this.scale.value[0])
                )))

                const middleX = subscribe(this.x.pipe(map(val => {
                    const scale = this.scale.value[0]
                    return val + ((mode === "input") ? scale / 10 : 9 * scale / 10)
                })))

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
                    @click=${() => this.handlePinClick(val)}
                    ></circle>
                `})
    }

    public pinx(mode = true, pinLength = 15) {
        return this.x.pipe(
            map(val => val + (
                (mode) ?
                    -pinLength :
                    this.scale.value[0] + pinLength
            ))
        )
    }

    public piny(mode = true, index: number) {
        const space = this.scale.value[1] / (mode ? this.inputs : this.outputs)
        return this.y.pipe(
            map(val => val + space * (2 * index + 1) / 2)
        )
    }

    static fromState(state: ComponentState) {
        return new Component(state.template, state.position, state.scale, state.id)
    }

    public static getId() {
        const data = runCounter.get()
        runCounter.increase()
        return data
    }
}