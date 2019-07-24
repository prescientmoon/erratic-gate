import { Camera } from './Camera'
import { Simulation } from '../../simulation/classes/Simulation'
import { Subject } from 'rxjs'
import { MouseEventInfo } from '../../core/components/MouseEventInfo'
import {
    oldPointInSquare,
    pointInSquare
} from '../../../common/math/helpers/pointInSquare'
import { vector2 } from '../../../common/math/types/vector2'
import { relativeTo, add, invert } from '../../vector2/helpers/basic'
import { SimulationRendererOptions } from '../types/SimulationRendererOptions'
import {
    defaultSimulationRendererOptions,
    mouseButtons,
    shiftInput
} from '../constants'
import { getPinPosition } from '../helpers/pinPosition'
import { pointInCircle } from '../../../common/math/helpers/pointInCircle'
import { SelectedPins } from '../types/SelectedPins'
import { Wire } from '../../simulation/classes/Wire'
import { currentStore } from '../../saving/stores/currentStore'
import { saveStore } from '../../saving/stores/saveStore'
import {
    fromSimulationState,
    fromCameraState
} from '../../saving/helpers/fromState'
import merge from 'deepmerge'
import { updateMouse, handleScroll } from '../helpers/scaleCanvas'
import { RefObject } from 'react'
import { dumpSimulation } from '../../saving/helpers/dumpSimulation'
import { modalIsOpen } from '../../modals/helpers/modalIsOpen'
import { SimulationError } from '../../errors/classes/SimulationError'
import { deleteWire } from '../../simulation/helpers/deleteWire'
import { RendererState } from '../../saving/types/SimulationSave'
import { setToArray } from '../../../common/lang/arrays/helpers/setToArray'
import { Transform } from '../../../common/math/classes/Transform'
import { gatesInSelection } from '../helpers/gatesInSelection'
import { selectionType } from '../types/selectionType'
import { addIdToSelection } from '../helpers/idIsSelected'

export class SimulationRenderer {
    public mouseDownOutput = new Subject<MouseEventInfo>()
    public mouseUpOutput = new Subject<MouseEventInfo>()
    public mouseMoveOutput = new Subject<MouseEventInfo>()
    public wheelOutput = new Subject<unknown>()

    public selectedGates: Record<selectionType, Set<number>> = {
        temporary: new Set<number>(),
        permanent: new Set<number>()
    }

    public options: SimulationRendererOptions
    public camera = new Camera()

    public selectedArea = new Transform()

    // first bit = dragging
    // second bit = panning around
    // third bit = selecting
    public mouseState = 0b000

    public lastMousePosition: vector2 = [0, 0]

    // this is used for spawning gates
    public spawnCount = 0

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

                if (
                    event.button === mouseButtons.drag &&
                    pointInSquare(worldPosition, transform)
                ) {
                    gates[index].onClick()

                    this.mouseState |= 1

                    addIdToSelection(this, 'temporary', id)

                    const gateNode = this.simulation.gates.get(id)

                    if (gateNode) {
                        return this.simulation.gates.moveOnTop(gateNode)
                    } else {
                        throw new SimulationError(
                            `Cannot find gate with id ${id}`
                        )
                    }
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
                        if (pin.value.pairs.size) {
                            if (pin.value.type & 1) {
                                const wire = this.simulation.wires.find(
                                    wire => wire.end.value === pin.value
                                )

                                if (wire) {
                                    deleteWire(this.simulation, wire)
                                } else {
                                    throw new SimulationError(
                                        `Cannot find wire to remove`
                                    )
                                }

                                return
                            }
                        }

                        if (
                            this.selectedPins.start &&
                            pin.value === this.selectedPins.start.wrapper.value
                        ) {
                            this.selectedPins.start = null
                            this.selectedPins.end = null
                        } else if (
                            this.selectedPins.end &&
                            pin.value === this.selectedPins.end.wrapper.value
                        ) {
                            this.selectedPins.start = null
                            this.selectedPins.end = null
                        } else if ((pin.value.type & 2) >> 1) {
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

                        if (this.selectedPins.start && this.selectedPins.end) {
                            this.simulation.wires.push(
                                new Wire(
                                    this.selectedPins.start.wrapper,
                                    this.selectedPins.end.wrapper
                                )
                            )
                            this.selectedPins.start = null
                            this.selectedPins.end = null
                        }

                        return
                    }
                }
            }

            if (!shiftInput.value && event.button === mouseButtons.unselect) {
                this.clearSelection()
            }

            if (event.button === mouseButtons.pan) {
                // the second bit = pannning
                this.mouseState |= 0b10
            } else if (event.button === mouseButtons.select) {
                this.selectedArea.position = this.lastMousePosition
                this.selectedArea.scale = [0, 0]

                // the third bit = selecting
                this.mouseState |= 0b100
            }
        })

        this.mouseUpOutput.subscribe(event => {
            if (event.button === mouseButtons.drag) {
                const selected = this.getSelected()

                for (const gate of selected) {
                    gate.transform.rotation = 0
                }

                this.selectedGates.temporary.clear()

                // turn first 2 bits to 0
                this.mouseState &= 1 << 2

                // for debugging
                if ((this.mouseState >> 1) & 1 || this.mouseState & 1) {
                    throw new SimulationError(
                        'First 2 bits of mouseState need to be set to 0'
                    )
                }
            }

            if (
                event.button === mouseButtons.select &&
                (this.mouseState >> 2) & 1
            ) {
                // turn the third bit to 0
                this.mouseState &= (1 << 2) - 1

                const selectedGates = gatesInSelection(
                    this.selectedArea,
                    Array.from(this.simulation.gates)
                )

                for (const { id } of selectedGates) {
                    addIdToSelection(this, 'permanent', id)
                }
            }
        })

        this.mouseMoveOutput.subscribe(event => {
            updateMouse(event)

            const worldPosition = this.camera.toWordPostition(event.position)

            const offset = invert(
                relativeTo(this.lastMousePosition, worldPosition)
            ).map(
                (value, index) => value * this.camera.transform.scale[index]
            ) as vector2

            if (this.mouseState & 1) {
                for (const gate of this.getSelected()) {
                    const { transform } = gate

                    transform.x -= offset[0]
                    transform.y -= offset[1]
                }
            }

            if ((this.mouseState >> 1) & 1) {
                this.camera.transform.position = add(
                    this.camera.transform.position,
                    invert(offset)
                )

                this.spawnCount = 0
            }

            if ((this.mouseState >> 2) & 1) {
                this.selectedArea.scale = relativeTo(
                    this.selectedArea.position,
                    this.camera.toWordPostition(event.position)
                )
            }

            this.lastMousePosition = this.camera.toWordPostition(event.position)
        })

        this.reloadSave()
    }

    public updateWheelListener() {
        if (this.ref.current) {
            this.ref.current.addEventListener('wheel', event => {
                if (!modalIsOpen()) {
                    event.preventDefault()

                    handleScroll(event, this.camera)
                }
            })
        }
    }

    public loadSave(save: RendererState) {
        this.simulation = fromSimulationState(save.simulation)
        this.camera = fromCameraState(save.camera)
    }

    public reloadSave() {
        try {
            dumpSimulation(this)

            const current = currentStore.get()
            const save = saveStore.get(current)

            if (!save) return
            if (!(save.simulation || save.camera)) return

            this.loadSave(save)
        } catch (e) {
            throw new Error(
                `An error occured while loading the save: ${
                    (e as Error).message
                }`
            )
        }
    }

    /**
     * Gets all selected gates in the simulation
     *
     * @throws SimulationError if an id isnt valid
     * @throws SimulationError if the id doesnt have a data prop
     */
    public getSelected() {
        return setToArray(this.allSelectedIds()).map(id => {
            const gate = this.simulation.gates.get(id)

            if (!gate) {
                throw new SimulationError(`Cannot find gate with id ${id}`)
            } else if (!gate.data) {
                throw new SimulationError(
                    `Cannot find data of gate with id ${id}`
                )
            }

            return gate.data
        })
    }

    /**
     * helper to merge the temporary and permanent selection
     */
    public allSelectedIds() {
        return new Set([
            ...setToArray(this.selectedGates.permanent),
            ...setToArray(this.selectedGates.temporary)
        ])
    }

    /**
     * Helper to clear all selected sets
     */
    public clearSelection() {
        this.selectedGates.permanent.clear()
        this.selectedGates.temporary.clear()
    }
}
