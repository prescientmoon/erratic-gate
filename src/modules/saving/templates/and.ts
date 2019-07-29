import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the and gate
 */
const andTemplate: PartialTemplate = {
    metadata: {
        name: 'and'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/and')
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
}

export default andTemplate
