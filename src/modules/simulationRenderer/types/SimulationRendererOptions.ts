export interface SimulationRendererOptions {
    dnd: {
        rotation: number
    }
    gates: {
        connectionLength: number
        pinRadius: number
        pinStrokeColor: string
        pinStrokeWidth: number
        pinFill: {
            open: string
            closed: string
        }
        gateStroke: {
            active: string
            normal: string
            width: number
        }
    }
    wires: {
        temporaryWireColor: string
        curvePointOffset: number
    }
    spawning: {
        spawnOffset: number
    }
}
