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
        fill: require('../../../assets/and.svg')
    },
    code: {
        activation: `
            const a = context.getBinary(0)
            const b = context.getBinary(1)
            const c = a & b
            
            context.setBinary(0, c)`
    },
    pins: {
        inputs: {
            count: 2
        }
    },
    info: ['https://en.wikipedia.org/wiki/AND_gate']
}

export default andTemplate
