import { SimulationRendererOptions } from './types/SimulationRendererOptions'

export const defaultSimulationRendererOptions: SimulationRendererOptions = {
    dnd: {
        rotation: Math.PI / 12 // 7.5 degrees
    },
    gates: {
        connectionLength: 30,
        pinRadius: 10,
        pinStrokeColor: '#888888',
        pinStrokeWidth: 3
    }
}
