import { Transform } from '../../../common/math/classes/Transform'
import { Pin } from './Pin'
import merge from 'deepmerge'
import { GateTemplate, PinCount } from '../types/GateTemplate'
import { DefaultGateTemplate } from '../constants'
import { idStore } from '../stores/idStore'
import { Context } from '../../activation/types/Context'
import { toFunction } from '../../activation/helpers/toFunction'
import { Subscription, combineLatest } from 'rxjs'
import { SimulationError } from '../../errors/classes/SimulationError'
import { throttleTime, debounce, debounceTime } from 'rxjs/operators'
import { getGateTimePipes } from '../helpers/getGateTimePipes'

export interface GatePins {
    inputs: Pin[]
    outputs: Pin[]
}

export interface PinWrapper {
    total: number
    index: number
    value: Pin
}

export type GateFunction = null | ((ctx: Context) => void)

export interface GateFunctions {
    activation: GateFunction
    onClick: GateFunction
}

export class Gate {
    public transform = new Transform()
    public _pins: GatePins = {
        inputs: [],
        outputs: []
    }

    public id: number
    public template: GateTemplate

    private functions: GateFunctions = {
        activation: null,
        onClick: null
    }

    private subscriptions: Subscription[] = []
    private memory: Record<string, unknown> = {}

    public constructor(template: DeepPartial<GateTemplate> = {}, id?: number) {
        this.template = merge(DefaultGateTemplate, template) as GateTemplate

        this.transform.scale = this.template.shape.scale

        this.functions.activation = toFunction(
            this.template.code.activation,
            'context'
        )

        this.functions.onClick = toFunction(
            this.template.code.onClick,
            'context'
        )

        this._pins.inputs = Gate.generatePins(
            this.template.pins.inputs,
            1,
            this
        )
        this._pins.outputs = Gate.generatePins(
            this.template.pins.outputs,
            2,
            this
        )

        this.id = id !== undefined ? id : idStore.generate()

        for (const pin of this._pins.inputs) {
            const pipes = getGateTimePipes(this.template)

            const subscription = pin.state.pipe(...pipes).subscribe(() => {
                this.update()
            })

            this.subscriptions.push(subscription)
        }
    }

    public onClick() {
        if (this.functions.onClick) {
            this.functions.onClick(this.getContext())
        }
    }

    public dispose() {
        for (const pin of this.pins) {
            pin.value.dispose()
        }

        for (const subscription of this.subscriptions) {
            subscription.unsubscribe()
        }
    }

    public update() {
        const context = this.getContext()

        if (!this.functions.activation)
            throw new SimulationError('Activation function is missing')

        this.functions.activation(context)
    }

    public getContext(): Context {
        return {
            get: (index: number) => {
                return this._pins.inputs[index].state.value
            },
            set: (index: number, state: boolean = false) => {
                return this._pins.outputs[index].state.next(state)
            },
            memory: this.memory,
            color: (color: string) => {
                if (this.template.material.type === 'color') {
                    this.template.material.value = color
                }
            }
        }
    }

    private getInputsStates() {
        return this._pins.inputs.map(pin => pin.state)
    }

    private wrapPins(pins: Pin[]) {
        const result: PinWrapper[] = []
        const length = pins.length

        for (let index = 0; index < length; index++) {
            result.push({
                index,
                total: length,
                value: pins[index]
            })
        }

        return result
    }

    public get pins() {
        const result = [
            ...this.wrapPins(this._pins.inputs),
            ...this.wrapPins(this._pins.outputs)
        ]

        return result
    }

    private static generatePins(options: PinCount, type: number, gate: Gate) {
        return [...Array(options.count)]
            .fill(true)
            .map(() => new Pin(type, gate))
    }
}
