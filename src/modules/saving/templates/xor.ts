import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the xor gate
 */
const xorTemplate: PartialTemplate = {
    metadata: {
        name: 'xor'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/xor')
    },
    code: {
        activation: `
            const a = context.getBinary(0)
            const b = context.getBinary(1)

            context.setBinary(0, a ^ b)`
    },
    info: ['https://en.wikipedia.org/wiki/XOR_gate'],
    pins: {
        inputs: {
            count: 2
        }
    }
}

export default xorTemplate
