import { GateTemplate, Property, RawProp } from './types/GateTemplate'
import { categories } from '../saving/data/categories'
import { getRendererSafely } from '../logic-gates/helpers/getRendererSafely'

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
    tags: ['base'],
    properties: {
        enabled: false,
        data: [
            {
                type: 'boolean',
                base: false,
                name: 'external'
            },
            {
                type: 'string',
                base: 'my-logic-gate',
                name: 'label'
            }
        ]
    },
    innerText: {
        enabled: false,
        color: 'white'
    },
    category: categories.basic,
    info: []
}

/**
 * Prop names which need to not be overriten
 */
export const reservedPropNames = DefaultGateTemplate.properties.data.map(
    ({ name }: RawProp) => name
)
