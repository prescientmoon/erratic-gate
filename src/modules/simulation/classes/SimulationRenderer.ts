import { Camera } from './Camera'
import { Simulation } from './Simulation'
import { Subject } from 'rxjs'
import { MouseEventInfo } from '../../core/components/FluidCanvas'
import { pointInSquare } from '../helpers/pointInSquare'
import { vector2 } from './Transform'
import merge from 'deepmerge'
import { smoothStep } from '../../vector2/helpers/smoothStep'
import { renderGate } from '../helpers/renderGate'
import { renderGateShadow } from '../helpers/renderGateShadow'
import { Gate } from './Gate'
import { MouseManager } from './MouseManager'
import { Screen } from '../../core/classes/Screen'
import {
    add,
    invert,
    ofLength,
    length,
    multiply
} from '../../vector2/helpers/basic'

export interface SimulationRendererOptions {
    shadows: {
        enabled: boolean
        color: string
        offset: number
        speed: number
    }
    dnd: {
        rotation: number
    }
}

export const defaultSimulationRendererOptions: SimulationRendererOptions = {
    shadows: {
        enabled: true,
        color: 'rgba(0,0,0,0.3)',
        offset: 15,
        speed: 1
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

        // render gates
        for (const gate of this.simulation.gates) {
            if (this.options.shadows.enabled) {
                renderGateShadow(ctx, this.options.shadows.color, gate)
            }

            renderGate(ctx, gate)
        }
    }

    public clear(ctx: CanvasRenderingContext2D) {
        const boundingBox = this.camera.transform.getBoundingBox()
        ctx.clearRect(...boundingBox)
    }

    public getGateById(id: number) {
        return this.simulation.gates.get(id)
    }

    public getOptimalShadow(gate: Gate) {
        const center = multiply([this.screen.x, this.screen.y] as vector2, 0.5)

        const difference = add(center, invert(gate.transform.position))

        return add(
            add(difference, center),
            ofLength(difference, this.options.shadows.offset)
        )
    }

    public getShadowPosition(gate: Gate) {
        return gate.transform.position.map(
            (value, index) => value - this.getOptimalShadow(gate)[index]
        ) as vector2
    }

    public update(delta: number) {
        for (const gate of this.simulation.gates) {
            gate.shadow = smoothStep(
                this.options.shadows.speed,
                gate.shadow,
                this.getShadowPosition(gate)
            )
        }

        const selected = this.getSelected()

        if (selected && this.movedSelection) {
            this.mouseManager.update()
            selected.transform.rotation =
                this.mouseManager.getDirection() * this.options.dnd.rotation
        } else {
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
