import { Transform } from '../../../common/math/classes/Transform'
import { Pin } from './Pin'
import merge from 'deepmerge'
import { GateTemplate, PinCount } from '../types/GateTemplate'
import { DefaultGateTemplate } from '../constants'

export interface GatePins {
    inputs: Pin[]
    outputs: Pin[]
}

export interface PinWrapper {
    total: number
    index: number
    value: Pin
}

export class Gate {
    public static lastId = 0

    public transform = new Transform()
    public id = Gate.lastId++
    public _pins: GatePins = {
        inputs: [],
        outputs: []
    }

    public template: GateTemplate

    public constructor(template: DeepPartial<GateTemplate> = {}) {
        this.template = merge(DefaultGateTemplate, template) as GateTemplate

        this._pins.inputs = Gate.generatePins(this.template.pins.inputs, 1)
        this._pins.outputs = Gate.generatePins(this.template.pins.outputs, 2)
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

    private static generatePins(options: PinCount, type: number) {
        return [...Array(options.count)].fill(true).map(() => new Pin(type))
    }
}
