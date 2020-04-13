import { GateTemplate } from './types/GateTemplate'
import { categories } from '../saving/data/categories'

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
        enabled: false,
        data: [
            {
                type: 'boolean',
                base: false,
                name: 'internal',
                show: (_, gate) =>
                    gate.env === 'global' &&
                    !gate.template.properties.data.some(
                        (prop) => prop.needsUpdate
                    )
            }
        ]
    },
    innerText: {
        enabled: false,
        color: 'white'
    },
    category: categories.basic
}
