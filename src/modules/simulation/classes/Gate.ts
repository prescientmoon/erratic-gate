import { Transform } from '../../../common/math/classes/Transform'
import { Pin } from './Pin'
import { GateTemplate, PinCount } from '../types/GateTemplate'
import { idStore } from '../stores/idStore'
import { Context, InitialisationContext } from '../../activation/types/Context'
import { toFunction } from '../../activation/helpers/toFunction'
import { Subscription } from 'rxjs'
import { SimulationError } from '../../errors/classes/SimulationError'
import { getGateTimePipes } from '../helpers/getGateTimePipes'
import { ImageStore } from '../../simulationRenderer/stores/imageStore'
import { completeTemplate } from '../../logic-gates/helpers/completeTemplate'
import { Simulation, SimulationEnv } from './Simulation'
import { fromSimulationState } from '../../saving/helpers/fromState'
import { saveStore } from '../../saving/stores/saveStore'
import { Wire } from './Wire'
import { cleanSimulation } from '../../simulation-actions/helpers/clean'

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

    // Related to integration
    private ghostSimulation: Simulation
    private ghostWires: Wire[] = []
    private isIntegrated = false
    public env: SimulationEnv = 'global'

    public constructor(template: DeepPartial<GateTemplate> = {}, id?: number) {
        this.template = completeTemplate(template)

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

        if (this.template.material.type === 'image') {
            ImageStore.set(this.template.material.value)
        }

        this.id = id !== undefined ? id : idStore.generate()

        for (const pin of this._pins.inputs) {
            const pipes = getGateTimePipes(this.template)

            const subscription = pin.state.pipe(...pipes).subscribe(() => {
                this.update()
            })

            this.subscriptions.push(subscription)
        }

        this.init()

        if (this.template.tags.includes('integrated')) {
            this.isIntegrated = true
        }

        if (this.isIntegrated) {
            const state = saveStore.get(this.template.metadata.name)

            if (!state) {
                throw new SimulationError(
                    `Cannot run ic ${
                        this.template.metadata.name
                    } - save not found`
                )
            }

            this.ghostSimulation = fromSimulationState(state.simulation, 'gate')
            cleanSimulation(this.ghostSimulation)

            const sortByPosition = (x: Gate, y: Gate) =>
                x.transform.position[1] - y.transform.position[1]

            const gates = Array.from(this.ghostSimulation.gates)

            const inputs = gates
                .filter(gate => gate.template.integration.input)
                .sort(sortByPosition)
                .map(gate => gate.wrapPins(gate._pins.outputs))
                .flat()

            const outputs = gates
                .filter(gate => gate.template.integration.output)
                .sort(sortByPosition)
                .map(gate => gate.wrapPins(gate._pins.inputs))
                .flat()

            if (inputs.length !== this._pins.inputs.length) {
                throw new SimulationError(
                    `Input count needs to match with the container gate: ${
                        inputs.length
                    } !== ${this._pins.inputs.length}`
                )
            }

            if (outputs.length !== this._pins.outputs.length) {
                throw new SimulationError(
                    `Output count needs to match with the container gate: ${
                        outputs.length
                    } !== ${this._pins.outputs.length}`
                )
            }

            const wrappedInputs = this.wrapPins(this._pins.inputs)
            const wrappedOutputs = this.wrapPins(this._pins.outputs)

            for (let index = 0; index < inputs.length; index++) {
                this.ghostWires.push(
                    new Wire(wrappedInputs[index], inputs[index], true)
                )
            }

            for (let index = 0; index < outputs.length; index++) {
                this.ghostWires.push(
                    new Wire(outputs[index], wrappedOutputs[index], true)
                )
            }

            this.ghostSimulation.wires.push(...this.ghostWires)
        }
    }

    private init() {
        toFunction<[InitialisationContext]>(
            this.template.code.initialisation,
            'context'
        )({
            memory: this.memory
        })
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

        if (this.isIntegrated) {
            this.ghostSimulation.dispose()
        }
    }

    public update() {
        if (this.template.tags.includes('integrated')) {
        } else {
            const context = this.getContext()

            if (!this.functions.activation)
                throw new SimulationError('Activation function is missing')

            this.functions.activation(context)
        }
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
            },
            enviroment: this.env
        }
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
