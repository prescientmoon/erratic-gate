import { Camera } from './Camera'
import { Simulation } from '../../simulation/classes/Simulation'
import { Subject } from 'rxjs'
import { MouseEventInfo } from '../../core/types/MouseEventInfo'
import { vector2 } from '../../../common/math/types/vector2'
import { SimulationRendererOptions } from '../types/SimulationRendererOptions'
import { defaultSimulationRendererOptions } from '../constants'
import { SelectedPins } from '../types/SelectedPins'
import { currentStore } from '../../saving/stores/currentStore'
import { saveStore } from '../../saving/stores/saveStore'
import {
    fromSimulationState,
    fromCameraState
} from '../../saving/helpers/fromState'
import merge from 'deepmerge'
import { handleScroll } from '../helpers/scaleCanvas'
import { RefObject } from 'react'
import { dumpSimulation } from '../../saving/helpers/dumpSimulation'
import { modalIsOpen } from '../../modals/helpers/modalIsOpen'
import { SimulationError } from '../../errors/classes/SimulationError'
import { RendererState, WireState } from '../../saving/types/SimulationSave'
import { setToArray } from '../../../common/lang/arrays/helpers/setToArray'
import { Transform } from '../../../common/math/classes/Transform'
import { selectionType } from '../types/selectionType'
import { GateInitter } from '../types/GateInitter'
import { handleMouseDown } from '../helpers/handleMouseDown'
import { handleMouseUp } from '../helpers/handleMouseUp'
import { handleMouseMove } from '../helpers/handleMouseMove'
import { Gate } from '../../simulation/classes/Gate'

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
    public clipboard: GateInitter[] = []
    public wireClipboard: WireState[] = []

    // first bit = dragging
    // second bit = panning
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
        options: Partial<SimulationRendererOptions> = {},
        public simulation = new Simulation('project', 'default')
    ) {
        this.options = merge(defaultSimulationRendererOptions, options)

        this.init()
    }

    public init() {
        this.mouseDownOutput.subscribe(handleMouseDown(this))
        this.mouseUpOutput.subscribe(handleMouseUp(this))
        this.mouseMoveOutput.subscribe(handleMouseMove(this))

        this.reloadSave()
    }

    public updateWheelListener(ref: RefObject<HTMLCanvasElement>) {
        if (ref.current) {
            ref.current.addEventListener('wheel', (event) => {
                if (!modalIsOpen() && location.pathname === '/') {
                    event.preventDefault()

                    handleScroll(event, this.camera)
                }
            })
        }
    }

    /**
     * Loads a simulation state
     *
     * @param save LThe state to load
     */
    public loadSave(save: RendererState) {
        this.simulation = fromSimulationState(save.simulation)
        this.camera = fromCameraState(save.camera)
    }

    public reloadSave() {
        dumpSimulation(this)

        const current = currentStore.get()
        const save = saveStore.get(current)

        if (!save) return
        if (!(save.simulation || save.camera)) return

        this.loadSave(save)
    }

    /**
     * Gets all selected gates in the simulation
     *
     * @throws SimulationError if an id isnt valid
     * @throws SimulationError if the id doesnt have a data prop
     */
    public getSelected(): Gate[] {
        return setToArray(this.allSelectedIds()).map((id) => {
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

    /**
     * Clears the selected pins of the renderer
     */
    public clearPinSelection() {
        this.selectedPins.end = null
        this.selectedPins.start = null
    }
}
