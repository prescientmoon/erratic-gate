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
    }
    wires: {
        temporaryWireColor: string
        curvePointOffset: number
    }
}
