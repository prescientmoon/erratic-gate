import { SimulationRendererOptions } from './types/SimulationRendererOptions'

export const defaultSimulationRendererOptions: SimulationRendererOptions = {
    dnd: {
        rotation: Math.PI / 12 // 7.5 degrees
    },
    gates: {
        connectionLength: 30,
        pinRadius: 10,
        pinStrokeColor: '#888888',
        pinStrokeWidth: 3,
        pinFill: {
            open: 'rgb(255,216,20)',
            closed: 'rgb(90,90,90)'
        }
    },
    wires: {
        temporaryWireColor: `rgba(128,128,128,0.5)`,
        curvePointOffset: 100
    }
}
