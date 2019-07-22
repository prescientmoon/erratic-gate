import { Camera } from './Camera'
import { Simulation } from '../../simulation/classes/Simulation'
import { Subject } from 'rxjs'
import { MouseEventInfo } from '../../core/components/FluidCanvas'
import { pointInSquare } from '../../../common/math/helpers/pointInSquare'
import { vector2 } from '../../../common/math/types/vector2'
import { MouseVelocityManager } from './MouseVelocityManager'
import { Screen } from '../../core/classes/Screen'
import { relativeTo, add, invert } from '../../vector2/helpers/basic'
import { SimulationRendererOptions } from '../types/SimulationRendererOptions'
import { defaultSimulationRendererOptions } from '../constants'
import { getPinPosition } from '../helpers/pinPosition'
import { pointInCircle } from '../../../common/math/helpers/pointInCircle'
import { SelectedPins } from '../types/SelectedPins'
import { Wire } from '../../simulation/classes/Wire'
import { KeyBindingMap } from '../../keybindings/types/KeyBindingMap'
import { save } from '../../saving/helpers/save'
import { initKeyBindings } from '../../keybindings/helpers/initialiseKeyBindings'
import { currentStore } from '../../saving/stores/currentStore'
import { saveStore } from '../../saving/stores/saveStore'
import {
    fromSimulationState,
    fromCameraState
} from '../../saving/helpers/fromState'
import merge from 'deepmerge'
import { wireConnectedToGate } from '../helpers/wireConnectedToGate'
import { updateMouse, handleScroll } from '../helpers/scaleCanvas'
import { RefObject } from 'react'
import { Singleton } from '@eix-js/utils'

export class SimulationRenderer {
    public mouseDownOutput = new Subject<MouseEventInfo>()
    public mouseUpOutput = new Subject<MouseEventInfo>()
    public mouseMoveOutput = new Subject<MouseEventInfo>()
    public wheelOutput = new Subject<unknown>()

    public selectedGate: number | null = null
    public lastMousePosition: vector2 = [0, 0]
    public movedSelection = false
    public options: SimulationRendererOptions
    public mouseManager = new MouseVelocityManager(this.mouseMoveOutput)
    public screen = new Screen()
    public camera = new Camera()

    // first bit = dragging
    // second bit = moving around
    private mouseState = 0b00
    private gateSelectionOffset: vector2 = [0, 0]

    public selectedPins: SelectedPins = {
        start: null,
        end: null
    }

    public constructor(
        public ref: RefObject<HTMLCanvasElement>,
        options: Partial<SimulationRendererOptions> = {},
        public simulation = new Simulation('project', 'default')
    ) {
        this.options = merge(defaultSimulationRendererOptions, options)

        this.init()
    }

    public init() {
        this.mouseDownOutput.subscribe(event => {
            const worldPosition = this.camera.toWordPostition(event.position)
            const gates = Array.from(this.simulation.gates)

            this.lastMousePosition = worldPosition

            // We need to iterate from the last to the first
            // because if we have 2 overlapping gates,
            // we want to select the one on top
            for (let index = gates.length - 1; index >= 0; index--) {
                const { transform, id, pins } = gates[index]

                if (pointInSquare(worldPosition, transform)) {
                    this.mouseManager.clear(worldPosition[0])

                    this.mouseState |= 1
                    this.movedSelection = false

                    this.selectedGate = id
                    this.gateSelectionOffset = worldPosition.map(
                        (position, index) =>
                            position - transform.position[index]
                    ) as vector2

                    const gateNode = this.simulation.gates.get(id)

                    if (gateNode) {
                        return this.simulation.gates.moveOnTop(gateNode)
                    }

                    return
                }

                for (const pin of pins) {
                    const position = getPinPosition(this, transform, pin)

                    if (
                        pointInCircle(
                            worldPosition,
                            position,
                            this.options.gates.pinRadius
                        )
                    ) {
                        if (
                            this.selectedPins.start &&
                            pin.value === this.selectedPins.start.wrapper.value
                        ) {
                            this.selectedPins.start = null
                        } else if (
                            this.selectedPins.end &&
                            pin.value === this.selectedPins.end.wrapper.value
                        ) {
                            this.selectedPins.end = null
                        } else if ((pin.value.type & 0b10) >> 1) {
                            this.selectedPins.start = {
                                wrapper: pin,
                                transform
                            }
                        } else if (pin.value.type & 1) {
                            this.selectedPins.end = {
                                wrapper: pin,
                                transform
                            }
                        }

                        if (
                            this.selectedPins.start &&
                            this.selectedPins.end &&
                            this.selectedPins.end.wrapper.value.pairs.size === 0
                        ) {
                            this.simulation.wires.push(
                                new Wire(
                                    this.selectedPins.start.wrapper,
                                    this.selectedPins.end.wrapper
                                )
                            )
                            this.selectedPins.start = null
                            this.selectedPins.end = null
                        }
                    }
                }
            }

            this.mouseState |= 2
        })

        this.mouseUpOutput.subscribe(event => {
            if (this.selectedGate !== null) {
                const selected = this.getSelected()

                if (selected) {
                    selected.transform.rotation = 0
                }

                this.selectedGate = null
                this.mouseState &= 0
            }

            this.mouseState &= 0b00
        })

        this.mouseMoveOutput.subscribe(event => {
            updateMouse(event)

            const worldPosition = this.camera.toWordPostition(event.position)

            if (this.mouseState & 1 && this.selectedGate !== null) {
                const gate = this.getGateById(this.selectedGate)

                if (!gate || !gate.data) return

                const transform = gate.data.transform

                transform.x = worldPosition[0] - this.gateSelectionOffset[0]
                transform.y = worldPosition[1] - this.gateSelectionOffset[1]

                if (!this.movedSelection) {
                    this.movedSelection = true
                }
            }

            if ((this.mouseState >> 1) & 1) {
                const offset = invert(
                    relativeTo(this.lastMousePosition, worldPosition)
                ).map(
                    (value, index) => value * this.camera.transform.scale[index]
                ) as vector2

                this.camera.transform.position = add(
                    this.camera.transform.position,
                    invert(offset)
                )
            }

            this.lastMousePosition = this.camera.toWordPostition(event.position)
        })

        this.reloadSave()
        this.initKeyBindings()
    }

    public updateWheelListener() {
        if (this.ref.current) {
            this.ref.current.addEventListener('wheel', event => {
                event.preventDefault()

                handleScroll(event, this.camera)
            })
        }
    }

    public reloadSave() {
        try {
            const current = currentStore.get()
            const save = saveStore.get(current)

            if (!save) return
            if (!(save.simulation || save.camera)) return

            this.simulation.dispose()
            this.simulation = fromSimulationState(save.simulation)
            this.camera = fromCameraState(save.camera)
        } catch (e) {
            throw new Error(
                `An error occured while loading the save: ${
                    (e as Error).message
                }`
            )
        }
    }

    private initKeyBindings() {
        const bindings: KeyBindingMap = [
            {
                keys: ['ctrl', 's'],
                actions: [() => save(this)]
            },
            {
                keys: ['delete'],
                actions: [
                    () => {
                        const selected = this.getSelected()

                        if (!selected) {
                            return
                        }

                        const node = this.simulation.gates.get(selected.id)

                        if (!node) {
                            return
                        }

                        for (const wire of this.simulation.wires) {
                            if (wireConnectedToGate(selected, wire)) {
                                wire.dispose()
                            }
                        }

                        this.simulation.wires = this.simulation.wires.filter(
                            wire => wire.active
                        )

                        selected.dispose()
                        this.simulation.gates.delete(node)
                    }
                ]
            }
        ]

        initKeyBindings(bindings)
    }

    public getGateById(id: number) {
        return this.simulation.gates.get(id)
    }

    public getSelected() {
        if (this.selectedGate === null) return null

        const gate = this.getGateById(this.selectedGate)

        if (!gate || !gate.data) return null

        return gate.data
    }
}
