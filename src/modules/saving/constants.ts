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
            fill: require('../../assets/and')
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
            name: 'nand'
        },
        material: {
            type: 'image',
            fill: require('../../assets/nand')
        },
        code: {
            activation: `context.set(0, !context.get(0) || !context.get(1))`
        },
        pins: {
            inputs: {
                count: 2
            }
        },
        info: ['https://en.wikipedia.org/wiki/NAND_gate']
    },
    {
        metadata: {
            name: 'or'
        },
        material: {
            type: 'image',
            fill: require('../../assets/or')
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
            fill: require('../../assets/nor')
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
            fill: require('../../assets/xor')
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
            name: 'xnor'
        },
        material: {
            type: 'image',
            fill: require('../../assets/xnor')
        },
        code: {
            activation: `
            const a = context.get(0)
            const b = context.get(1)
            const c = (a && b) || !(a || b)
            
            context.set(0, c)`
        },
        info: ['https://en.wikipedia.org/wiki/XNOR_gate'],
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
            type: 'image',
            fill: require('../../assets/not')
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
            fill: '#D32F2E',
            stroke: {
                normal: '#AB8C31',
                active: '#7EF813'
            },
            colors: {
                pressed: '#7D1313'
            }
        },
        code: {
            onClick: `
                const old = context.memory.state
                const state = !old

                context.set(0, state)    
                context.color(old ? context.colors.main : context.colors.pressed)

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
            fill: '#1C1C1C',
            stroke: {
                normal: '#3C3C3C'
            },
            colors: {
                active: '#C6FF00'
            }
        },
        code: {
            activation: `
                const { main, active } = context.colors

                context.color(context.get(0) ? active : main)
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
    },
    {
        metadata: {
            name: 'rgb light'
        },
        material: {
            fill: '#1C1C1C',
            colors: {
                1: '#00f',
                2: `#0f0`,
                3: `#0ff`,
                4: `#f00`,
                5: `#f0f`,
                6: `#ff0`,
                7: `#fff`
            }
        },
        code: {
            activation: `
                const color = (context.get(0) << 2) + (context.get(1) << 1) + context.get(2)

                if (color === 0){
                    context.color(context.colors.main)
                }

                else{
                    context.color(context.colors[color])
                }
            `
        },
        integration: {
            output: true
        },
        info: ['https://en.wikipedia.org/wiki/Incandescent_light_bulb'],
        pins: {
            outputs: {
                count: 0
            },
            inputs: {
                count: 3
            }
        }
    },
    {
        metadata: {
            name: 'Sequential delayer'
        },
        material: {
            type: 'image',
            fill: require('../../assets/sequential')
        },
        code: {
            activation: `
                const i = context.get(0)
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        res()
                    },1000)
                }).then(() => {
                    context.set(0,i)
                })
            `,
            async: true
        }
    },
    {
        metadata: {
            name: 'Parallel delayer'
        },
        material: {
            type: 'image',
            fill: require('../../assets/parallel')
        },
        code: {
            activation: `
                const i = context.get(0)
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        res()
                    },1000)
                }).then(() => {
                    context.set(0,i)
                })
            `
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
