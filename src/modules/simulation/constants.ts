import { GateTemplate } from './types/GateTemplate'

export const DefaultGateTemplate: GateTemplate = {
    metadata: {
        name: 'Default template'
    },
    material: {
        type: 'color',
        fill: 'blue',
        stroke: {
            active: '#76FF02',
            normal: '#3FC4FF'
        },
        colors: {}
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
    },
    shape: {
        radius: 10,
        rounded: true,
        scale: [100, 100]
    },
    code: {
        async: false,
        activation: '',
        onClick: '',
        initialisation: ''
    },
    simulation: {
        debounce: {
            enabled: true,
            time: 1000 / 60
        },
        throttle: {
            enabled: false
        }
    },
    integration: {
        allowed: true,
        input: false,
        output: false
    },
    info: [],
    tags: ['base'],
    properties: {
        enabled: false
    }
}
