import { GateTemplate } from '../simulation/types/GateTemplate'
import { RendererState } from './types/SimulationSave'

export const defaultSimulationName = 'default'
export const baseTemplates: DeepPartial<GateTemplate>[] = [
    {
        metadata: {
            name: 'not'
        },
        material: {
            value: 'red',
            type: 'color'
        },
        code: {
            activation: `context.set(0, !context.get(0))`
        },
        pins: {
            inputs: {
                count: 1,
                variable: false
            },
            outputs: {
                count: 1,
                variable: false
            }
        }
    }
]

export const baseSave: RendererState = {
    camera: {
        transform: {
            position: [0, 0],
            scale: [1, 1],
            rotation: 0
        }
    },
    simulation: {
        gates: [],
        mode: 'project',
        wires: [],
        name: 'default'
    }
}
