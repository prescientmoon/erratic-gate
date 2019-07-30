import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the fullAdder gate
 */
const fullAdderTemplate: PartialTemplate = {
    metadata: {
        name: 'full adder'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/full-adder')
    },
    code: {
        activation: `
            const result = context.get(0) + context.get(1) + context.get(2)

            context.set(0, result & 1)
            context.set(1, result >> 1)
        `
    },
    pins: {
        inputs: {
            count: 3
        },
        outputs: {
            count: 2
        }
    }
}

export default fullAdderTemplate
