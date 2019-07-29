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
        fill: require('../../../assets/nand')
    },
    code: {
        activation: `context.set(0, !context.get(0) || !context.get(1))`
    },
    pins: {
        inputs: {
            count: 2
        }
    },
    info: ['https://en.wikipedia.org/wiki/NAND_gate']
}

export default nandTemplate
