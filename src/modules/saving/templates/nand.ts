import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the nand gate
 */
const nandTemplate: PartialTemplate = {
    metadata: {
        name: 'nand'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/nand.svg')
    },
    code: {
        activation: `
            const a = context.getBinary(0)
            const b = context.getBinary(1)
            const c = context.invertBinary(a & b)

            context.setBinary(0, c)`
    },
    pins: {
        inputs: {
            count: 2
        }
    },
    info: ['https://en.wikipedia.org/wiki/NAND_gate']
}

export default nandTemplate
