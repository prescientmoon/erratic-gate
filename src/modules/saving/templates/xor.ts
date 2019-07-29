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
}

export default xorTemplate
