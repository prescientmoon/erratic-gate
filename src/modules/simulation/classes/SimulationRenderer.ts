import { Camera } from './Camera'
import { Simulation } from './Simulation'
import { Subject } from 'rxjs'
import { MouseEventInfo } from '../../core/components/FluidCanvas'
import { pointInSquare } from '../helpers/pointInSquare'
import { vector2 } from './Transform'
import merge from 'deepmerge'
import { renderGate } from '../helpers/renderGate'
import { renderGateShadow } from '../helpers/renderGateShadow'
import { MouseManager } from './MouseManager'
import { Screen } from '../../core/classes/Screen'
import { relativeTo, add, invert } from '../../vector2/helpers/basic'

export interface SimulationRendererOptions {
    shadows: {
        enabled: boolean
        color: string
        lightHeight: number
        gateHeight: number
    }
    dnd: {
        rotation: number
    }
}

export const defaultSimulationRendererOptions: SimulationRendererOptions = {
    shadows: {
        enabled: true,
        color: 'rgba(0,0,0,0.3)',
        gateHeight: 10,
        lightHeight: 100
    },
    dnd: {
        rotation: Math.PI / 12 // 7.5 degrees
    }
}

export class SimulationRenderer {
    public camera = new Camera()
    public mouseDownOutput = new Subject<MouseEventInfo>()
    public mouseUpOutput = new Subject<MouseEventInfo>()
    public mouseMoveOutput = new Subject<MouseEventInfo>()

    public selectedGate: number | null = null
    public lastMousePosition: vector2 = [0, 0]
    public movedSelection = false

    // first bit = dragging
    // second bit = moving around
    private mouseState = 0b00

    private options: SimulationRendererOptions
    private mouseManager = new MouseManager(this.mouseMoveOutput)
    private screen = new Screen()

    public constructor(
        options: Partial<SimulationRendererOptions> = {},
        public simulation = new Simulation()
    ) {
        this.options = merge(options, defaultSimulationRendererOptions)

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
                    this.lastMousePosition = worldPosition.map(
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

            this.lastMousePosition = worldPosition
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

                transform.x = worldPosition[0] - this.lastMousePosition[0]
                transform.y = worldPosition[1] - this.lastMousePosition[1]

                if (!this.movedSelection) {
                    this.movedSelection = true
                }
            }

            if ((this.mouseState >> 1) & 1) {
                const offset = invert(
                    relativeTo(this.lastMousePosition, worldPosition)
                )

                this.camera.transform.position = add(
                    this.camera.transform.position,
                    invert(offset)
                )

                this.lastMousePosition = this.camera.toWordPostition(
                    event.position
                )
            }
        })
    }

    public render(ctx: CanvasRenderingContext2D) {
        this.clear(ctx)

        ctx.translate(...this.camera.transform.position)

        const center = relativeTo(
            this.camera.transform.position,
            this.screen.center
        )

        // render gates
        for (const gate of this.simulation.gates) {
            if (this.options.shadows.enabled) {
                renderGateShadow(
                    ctx,
                    this.options.shadows.color,
                    gate,
                    this.options.shadows.gateHeight,
                    [center[0], center[1], this.options.shadows.lightHeight]
                )
            }

            renderGate(ctx, gate)
        }

        ctx.translate(...invert(this.camera.transform.position))
    }

    public clear(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ...this.camera.transform.scale)
    }

    public getGateById(id: number) {
        return this.simulation.gates.get(id)
    }

    public update(delta: number) {
        const selected = this.getSelected()

        if (selected && this.movedSelection) {
            this.mouseManager.update()
            selected.transform.rotation =
                this.mouseManager.getDirection() * this.options.dnd.rotation
        } else {
            if (selected) {
                selected.transform.rotation = 0
            }
            this.mouseManager.update()
        }
    }

    public getSelected() {
        if (this.selectedGate === null) return null

        const gate = this.getGateById(this.selectedGate)

        if (!gate || !gate.data) return null

        return gate.data
    }
}
