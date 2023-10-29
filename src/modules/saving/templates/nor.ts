import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the nor gate
 */
const norTemplate: PartialTemplate = {
    metadata: {
        name: 'nor'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/nor.svg')
    },
    code: {
        activation: `
            const a = context.getBinary(0)
            const b = context.getBinary(1)
            const c = context.invertBinary(a | b)

            context.setBinary(0, c)
        `
    },
    pins: {
        inputs: {
            count: 2
        }
    },
    info: ['https://en.wikipedia.org/wiki/NOR_gate']
}

export default norTemplate
