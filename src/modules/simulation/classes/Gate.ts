import { Transform } from '../../../common/math/classes/Transform'
import { Pin } from './Pin'
import merge from 'deepmerge'
import { GateTemplate, PinCount } from '../types/GateTemplate'
import { DefaultGateTemplate } from '../constants'
import { idStore } from '../stores/idStore'

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
    public transform = new Transform()
    public _pins: GatePins = {
        inputs: [],
        outputs: []
    }

    public id: number
    public template: GateTemplate

    public constructor(template: DeepPartial<GateTemplate> = {}, id?: number) {
        this.template = merge(DefaultGateTemplate, template) as GateTemplate

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
