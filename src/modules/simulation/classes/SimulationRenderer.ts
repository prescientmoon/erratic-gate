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
        lightHeight: 50
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
    public selectOffset: vector2 = [0, 0]
    public movedSelection = false

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

                    this.movedSelection = false

                    this.selectedGate = id
                    this.selectOffset = worldPosition.map(
                        (position, index) =>
                            position - transform.position[index]
                    ) as vector2

                    const gateNode = this.simulation.gates.get(id)

                    if (gateNode) {
                        return this.simulation.gates.moveOnTop(gateNode)
                    }
                }
            }
        })

        this.mouseUpOutput.subscribe(event => {
            if (this.selectedGate !== null) {
                const selected = this.getSelected()

                if (selected) {
                    selected.transform.rotation = 0
                }

                this.selectedGate = null
            }
        })

        this.mouseMoveOutput.subscribe(event => {
            if (this.selectedGate !== null) {
                const gate = this.getGateById(this.selectedGate)

                if (!gate || !gate.data) return

                const transform = gate.data.transform
                const worldPosition = this.camera.toWordPostition(
                    event.position
                )

                transform.x = worldPosition[0] - this.selectOffset[0]
                transform.y = worldPosition[1] - this.selectOffset[1]

                if (!this.movedSelection) {
                    this.movedSelection = true
                }
            }
        })
    }

    public render(ctx: CanvasRenderingContext2D) {
        this.clear(ctx)

        const center = this.screen.center

        // render gates
        for (const gate of this.simulation.gates) {
            renderGate(ctx, gate)
            if (this.options.shadows.enabled) {
                renderGateShadow(
                    ctx,
                    this.options.shadows.color,
                    gate,
                    this.options.shadows.gateHeight,
                    [center[0], center[1], this.options.shadows.lightHeight]
                )
            }

            // renderGate(ctx, gate)
        }
    }

    public clear(ctx: CanvasRenderingContext2D) {
        const boundingBox = this.camera.transform.getBoundingBox()
        ctx.clearRect(...boundingBox)
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
            this.mouseManager.update()
        }

        // for (const gate of this.simulation.gates) {
        //     gate.transform.rotation += 0.01
        // }
    }

    public getSelected() {
        if (this.selectedGate === null) return null

        const gate = this.getGateById(this.selectedGate)

        if (!gate || !gate.data) return null

        return gate.data
    }
}
