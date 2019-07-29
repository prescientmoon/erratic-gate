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
        fill: require('../../../assets/nor')
    },
    code: {
        activation: `context.set(0, !(context.get(0) || context.get(1)))`
    },
    pins: {
        inputs: {
            count: 2
        }
    },
    info: ['https://en.wikipedia.org/wiki/NOR_gate']
}

export default norTemplate
