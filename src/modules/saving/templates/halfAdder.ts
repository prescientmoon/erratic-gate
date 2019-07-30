import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the halfAdder gate
 */
const halfAdderTemplate: PartialTemplate = {
    metadata: {
        name: 'half adder'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/half-adder')
    },
    code: {
        activation: `
            const result = context.get(0) + context.get(1)

            context.set(0, result & 1)
            context.set(1, result >> 1)
        `
    },
    pins: {
        inputs: {
            count: 2
        },
        outputs: {
            count: 2
        }
    }
}

export default halfAdderTemplate
