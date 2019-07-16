import { SimulationRendererOptions } from './types/SimulationRendererOptions'

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
