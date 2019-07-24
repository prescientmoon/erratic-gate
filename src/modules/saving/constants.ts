import { GateTemplate } from '../simulation/types/GateTemplate'
import { RendererState } from './types/SimulationSave'

export const defaultSimulationName = 'default'
export const baseTemplates: DeepPartial<GateTemplate>[] = [
    {
        metadata: {
            name: 'and'
        },
        material: {
            type: 'image',
            value: require('../../assets/and_gate')
        },
        code: {
            activation: `context.set(0, context.get(0) && context.get(1))`
        },
        pins: {
            inputs: {
                count: 2
            }
        },
        info: ['https://en.wikipedia.org/wiki/AND_gate']
    },
    {
        metadata: {
            name: 'or'
        },
        material: {
            type: 'image',
            value: require('../../assets/or_gate.png')
        },
        code: {
            activation: `context.set(0, context.get(0) || context.get(1))`
        },
        pins: {
            inputs: {
                count: 2
            }
        },
        info: ['https://en.wikipedia.org/wiki/OR_gate']
    },
    {
        metadata: {
            name: 'nor'
        },
        material: {
            type: 'image',
            value: require('../../assets/nor_gate.png')
        },
        code: {
            activation: `context.set(0, !(context.get(0) || context.get(1)))`
        },
        pins: {
            inputs: {
                count: 2
            }
        },
        info: ['https://en.wikipedia.org/wiki/NOR_gate']
    },
    {
        metadata: {
            name: 'xor'
        },
        material: {
            type: 'image',
            value: require('../../assets/xor_gate')
        },
        code: {
            activation: `
            const a = context.get(0)
            const b = context.get(1)
            const c = (a || b) && (!a || !b)
            
            context.set(0, c)`
        },
        info: ['https://en.wikipedia.org/wiki/XOR_gate'],
        pins: {
            inputs: {
                count: 2
            }
        }
    },
    {
        metadata: {
            name: 'not'
        },
        material: {
            value: 'red'
        },
        code: {
            activation: `context.set(0, !context.get(0))`
        },
        info: ['https://en.wikipedia.org/wiki/Inverter_(logic_gate)']
    },
    {
        metadata: {
            name: 'button'
        },
        material: {
            value: 'red'
        },
        code: {
            onClick: `
                const old = context.memory.state
                const state = !old

                context.set(0, state)    
                context.color(old ? 'red' : '#550000')

                context.memory.state = state
            `
        },
        pins: {
            inputs: {
                count: 0
            }
        },
        integration: {
            input: true
        },
        info: ['https://en.wikipedia.org/wiki/Push-button']
    },
    {
        metadata: {
            name: 'light bulb'
        },
        shape: {
            radius: 50
        },
        material: {
            value: 'white'
        },
        code: {
            activation: `
                context.color(context.get(0) ? 'yellow' : 'white')
            `
        },
        integration: {
            output: true
        },
        info: ['https://en.wikipedia.org/wiki/Incandescent_light_bulb'],
        pins: {
            outputs: {
                count: 0
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
