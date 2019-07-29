import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the or gate
 */
const orTemplate: PartialTemplate = {
    metadata: {
        name: 'or'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/or')
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
}

export default orTemplate
