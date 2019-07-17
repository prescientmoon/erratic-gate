import { GateTemplate } from './types/GateTemplate'

export const DefaultGateTemplate: GateTemplate = {
    material: {
        type: 'color',
        value: 'blue'
    },
    pins: {
        inputs: {
            count: 2,
            variable: false
        },
        outputs: {
            count: 1,
            variable: false
        }
    },
    shape: {
        radius: 10,
        rounded: true
    }
}
