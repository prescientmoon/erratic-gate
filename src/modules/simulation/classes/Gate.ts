import { Transform } from '../../../common/math/classes/Transform'
import { Pin } from './Pin'
import {
    GateTemplate,
    PinCount,
    isGroup,
    Property
} from '../types/GateTemplate'
import { idStore } from '../stores/idStore'
import { Context, InitialisationContext } from '../../activation/types/Context'
import { toFunction } from '../../activation/helpers/toFunction'
import {
    Subscription,
    BehaviorSubject,
    asapScheduler,
    animationFrameScheduler
} from 'rxjs'
import { SimulationError } from '../../errors/classes/SimulationError'
import { getGateTimePipes } from '../helpers/getGateTimePipes'
import { ImageStore } from '../../simulationRenderer/stores/imageStore'
import { completeTemplate } from '../../logic-gates/helpers/completeTemplate'
import { Simulation, SimulationEnv } from './Simulation'
import { fromSimulationState } from '../../saving/helpers/fromState'
import { saveStore } from '../../saving/stores/saveStore'
import { Wire } from './Wire'
import { cleanSimulation } from '../../simulation-actions/helpers/clean'
import { ExecutionQueue } from '../../activation/classes/ExecutionQueue'
import { tap, observeOn } from 'rxjs/operators'
import { PropsSave } from '../../saving/types/SimulationSave'
import { ValueOf } from '../../../common/lang/record/types/ValueOf'

/**
 * The interface for the pins of a gate
 */
export interface GatePins {
    inputs: Pin[]
    outputs: Pin[]
}

/**
 * Wrapper around a pin so it can be rendered at the right place
 */
export interface PinWrapper {
    total: number
    index: number
    value: Pin
}

/**
 * A function wich can be run with an activation context
 */
export type GateFunction = null | ((ctx: Context) => void)

/**
 * All functions a gate must remember
 */
export interface GateFunctions {
    activation: GateFunction
    onClick: GateFunction
}

export type GateProps = {
    [K in keyof PropsSave]: BehaviorSubject<PropsSave[K]> | GateProps
} & {
    external: BehaviorSubject<boolean>
    label: BehaviorSubject<string>
}

export class Gate {
    /**
     * The transform of the gate
     */
    public transform = new Transform()

    /**
     * The object holding all the pins the gate curently has
     */
    public _pins: GatePins = {
        inputs: [],
        outputs: []
    }

    /**
     * The id of the gate
     */
    public id: number

    /**
     * The template the gate needs to follow
     */
    public template: GateTemplate

    /**
     * All the functions created from the template strings
     */
    private functions: GateFunctions = {
        activation: null,
        onClick: null
    }

    /**
     * Used only if the gate is async
     */
    private executionQueue = new ExecutionQueue<void>()

    /**
     * All rxjs subscriptions the gate created
     * (if they are not manually cleared it can lead to memory leaks)
     */
    private subscriptions: Subscription[] = []

    /**
     * The state the activation functions have aces to
     */
    private memory: Record<string, unknown> = {}

    /**
     * The inner simulaton used by integrated circuits
     */
    private ghostSimulation: Simulation

    /**
     * The wires connecting the outer simulation to the inner one
     */
    private ghostWires: Wire[] = []

    /**
     * Boolean keeping track if the component is an ic
     */
    private isIntegrated = false

    /**
     * Used to know if the component runs in the global scope (rendered)
     * or insie an integrated circuit
     */
    public env: SimulationEnv = 'global'

    /**
     * Holds all the gate-related text
     */
    public text = {
        inner: new BehaviorSubject('text goes here')
    }

    /**
     * The props used by the activation function (the same as memory but presists)
     */
    public props: GateProps = {} as GateProps

    /**
     * The main logic gate class
     *
     * @param template The template the gate needs to follow
     * @param id The id of the gate
     */
    public constructor(
        template: DeepPartial<GateTemplate> = {},
        id?: number,
        props: PropsSave = {}
    ) {
        this.template = completeTemplate(template)
        this.transform.scale = this.template.shape.scale

        if (this.template.material.type === 'color') {
            this.template.material.colors.main = this.template.material.fill
        }

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
            ImageStore.set(this.template.material.fill)
        }

        this.id = id !== undefined ? id : idStore.generate()

        for (const pin of this._pins.inputs) {
            const pipes = getGateTimePipes(this.template)

            const subscription = pin.state.pipe(...pipes).subscribe(() => {
                if (this.template.code.async) {
                    this.executionQueue.push(async () => {
                        return await this.update()
                    })
                } else {
                    this.update()
                }
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
                    `Cannot run ic ${this.template.metadata.name} - save not found`
                )
            }

            this.ghostSimulation = fromSimulationState(state.simulation, 'gate')
            cleanSimulation(this.ghostSimulation)

            const sortByPosition = (x: Gate, y: Gate) =>
                x.transform.position[1] - y.transform.position[1]

            const gates = Array.from(this.ghostSimulation.gates)

            const inputs = gates
                .filter((gate) => gate.template.integration.input)
                .sort(sortByPosition)
                .map((gate) => gate.wrapPins(gate._pins.outputs))
                .flat()

            const outputs = gates
                .filter((gate) => gate.template.integration.output)
                .sort(sortByPosition)
                .map((gate) => gate.wrapPins(gate._pins.inputs))
                .flat()

            if (inputs.length !== this._pins.inputs.length) {
                throw new SimulationError(
                    `Input count needs to match with the container gate: ${inputs.length} !== ${this._pins.inputs.length}`
                )
            }

            if (outputs.length !== this._pins.outputs.length) {
                throw new SimulationError(
                    `Output count needs to match with the container gate: ${outputs.length} !== ${this._pins.outputs.length}`
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

        this.assignProps(props)
    }

    private updateNestedProp(
        path: string[],
        value: ValueOf<PropsSave>,
        gate: Gate = this
    ) {
        if (!path.length) {
            return
        }

        if (path.length === 1) {
            const subject = gate.props[path[0]]

            if (subject instanceof BehaviorSubject) {
                subject.next(value)
            }

            return
        }

        const nextGates = [...gate.ghostSimulation.gates].filter(
            (gate) => gate.props?.label?.value === path[0]
        )

        for (const nextGate of nextGates) {
            this.updateNestedProp(path.slice(1), value, nextGate)
        }
    }

    /**
     * Assign the props passed to the gate and mere them with the base ones
     */
    private assignProps(
        source: PropsSave,
        props: Property[] = this.template.properties.data,
        target: GateProps = this.props,
        path: string[] = []
    ) {
        let shouldUpdate = false

        if (this.template.properties.enabled) {
            for (const prop of props) {
                if (isGroup(prop)) {
                    const { groupName } = prop
                    target[groupName] = {} as GateProps
                    const needsUpdate = this.assignProps(
                        typeof source[groupName] === 'object'
                            ? (source[groupName] as PropsSave)
                            : {},
                        prop.props,
                        target[groupName] as GateProps,
                        [...path, groupName]
                    )

                    if (needsUpdate) {
                        shouldUpdate = true
                    }

                    continue
                }

                const { name, base, needsUpdate } = prop

                const subject = new BehaviorSubject(
                    source.hasOwnProperty(name) ? source[name] : base
                )

                target[name] = subject

                this.subscriptions.push(
                    subject.subscribe((value) => {
                        if (needsUpdate && path.length === 0) {
                            return this.update()
                        }

                        if (path.length === 0) {
                            return
                        }

                        this.updateNestedProp([...path, name], value)
                    })
                )

                if (needsUpdate) {
                    shouldUpdate = true
                }
            }
        }

        return shouldUpdate
    }

    /**
     * Runs the init function from the template
     */
    private init() {
        toFunction<[InitialisationContext]>(
            this.template.code.initialisation,
            'context'
        )({
            memory: this.memory
        })
    }

    /**
     * Runs the onClick function from the template
     */
    public onClick() {
        if (this.functions.onClick) {
            this.functions.onClick(this.getContext())
        }
    }

    /**
     * Used to get the props as an object
     */
    public getProps(target = this.props) {
        const props: PropsSave = {}

        for (const [key, value] of Object.entries(target)) {
            if (value instanceof BehaviorSubject) {
                props[key] = value.value
            } else {
                props[key] = this.getProps(value)
            }
        }

        return props
    }

    /**
     * Clears subscriptions to prevent memory leaks
     */
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

    /**
     * Runs the activation function from the template
     */
    public update() {
        if (!this.template.tags.includes('integrated')) {
            const context = this.getContext()

            if (!this.functions.activation)
                throw new SimulationError('Activation function is missing')

            return this.functions.activation(context)
        }
    }

    /**
     * Generates the activation context
     */
    public getContext(): Context {
        const maxLength = Math.max(
            ...this._pins.inputs.map((pin) => pin.state.value.length)
        )

        const toLength = (
            original: string | number,
            length: number = maxLength
        ) => {
            const value = original.toString(2)

            if (value.length === length) {
                return value
            } else if (value.length > length) {
                const difference = value.length - length

                return value.substr(difference)
            } else {
                return `${'0'.repeat(length - value.length)}${value}`
            }
        }

        return {
            get: (index: number) => {
                return this._pins.inputs[index].state.value
            },
            set: (index: number, state) => {
                return this._pins.outputs[index].state.next(state)
            },
            getBinary: (index: number) => {
                return parseInt(this._pins.inputs[index].state.value, 2)
            },
            setBinary: (
                index: number,
                value: number,
                bits: number = maxLength
            ) => {
                return this._pins.outputs[index].state.next(
                    toLength(value.toString(2), bits)
                )
            },
            invertBinary: (value: number) => {
                return value ^ ((1 << maxLength) - 1)
            },
            color: (color: string) => {
                if (this.template.material.type === 'color') {
                    this.template.material.fill = color
                }
            },
            getProperty: (name: string) => {
                return this.props[name].value
            },
            setProperty: (name: string, value: string | number | boolean) => {
                const subject = this.props[name]
                if (subject instanceof BehaviorSubject) {
                    subject.next(value)
                }
            },
            innerText: (value: string) => {
                this.text.inner.next(value)
            },
            update: () => {
                this.update()
            },
            toLength,
            maxLength,
            enviroment: this.env,
            memory: this.memory,
            colors: {
                ...this.template.material.colors
            }
        }
    }

    /**
     * Generates pin wrappers from an array of pins
     *
     * @param pins The pins to wwap
     */
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

    /**
     * Returns all pins (input + output)
     */
    public get pins() {
        const result = [
            ...this.wrapPins(this._pins.inputs),
            ...this.wrapPins(this._pins.outputs)
        ]

        return result
    }

    /**
     * Generates empty pins for any gate
     */
    private static generatePins(options: PinCount, type: number, gate: Gate) {
        return [...Array(options.count)]
            .fill(true)
            .map((v, index) => new Pin(type, gate))
    }
}
