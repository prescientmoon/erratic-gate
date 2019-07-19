import { GateTemplate } from '../simulation/types/GateTemplate'

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
