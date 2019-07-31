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
        activation: `
            const a = context.getBinary(0)
            const b = context.getBinary(1)

            context.setBinary(0, a | b)
        `
    },
    pins: {
        inputs: {
            count: 2
        }
    },
    info: ['https://en.wikipedia.org/wiki/OR_gate']
}

export default orTemplate
