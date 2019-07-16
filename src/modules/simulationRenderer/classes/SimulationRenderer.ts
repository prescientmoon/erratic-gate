import { Camera } from './Camera'
import { Simulation } from '../../simulation/classes/Simulation'
import { Subject } from 'rxjs'
import { MouseEventInfo } from '../../core/components/FluidCanvas'
import { pointInSquare } from '../helpers/pointInSquare'
import { vector2 } from '../../simulation/classes/Transform'
import { MouseVelocityManager } from './MouseVelocityManager'
import { Screen } from '../../core/classes/Screen'
import { relativeTo, add, invert } from '../../vector2/helpers/basic'
import { SimulationRendererOptions } from '../types/SimulationRendererOptions'
import { defaultSimulationRendererOptions } from '../constants'
import merge from 'deepmerge'

export class SimulationRenderer {
    public mouseDownOutput = new Subject<MouseEventInfo>()
    public mouseUpOutput = new Subject<MouseEventInfo>()
    public mouseMoveOutput = new Subject<MouseEventInfo>()

    // first bit = dragging
    // second bit = moving around
    private mouseState = 0b00

    private selectedGate: number | null = null
    private gateSelectionOffset: vector2 = [0, 0]

    public movedSelection = false
    public options: SimulationRendererOptions
    public mouseManager = new MouseVelocityManager(this.mouseMoveOutput)
    public screen = new Screen()
    public camera = new Camera()

    public constructor(
        options: Partial<SimulationRendererOptions> = {},
        public simulation = new Simulation()
    ) {
        this.options = merge(defaultSimulationRendererOptions, options)

        this.init()
    }

    public init() {
        this.mouseDownOutput.subscribe(event => {
            const worldPosition = this.camera.toWordPostition(event.position)
            const gates = Array.from(this.simulation.gates)

            // We need to iterate from the last to the first
            // because if we have 2 overlapping gates,
            // we want to select the one on top
            for (let index = gates.length - 1; index >= 0; index--) {
                const { transform, id } = gates[index]

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
            }

            this.gateSelectionOffset = worldPosition
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
                    relativeTo(this.gateSelectionOffset, worldPosition)
                )

                this.camera.transform.position = add(
                    this.camera.transform.position,
                    invert(offset)
                )

                this.gateSelectionOffset = this.camera.toWordPostition(
                    event.position
                )
            }
        })
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
