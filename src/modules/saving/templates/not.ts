import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the not gate
 */
const notTemplate: PartialTemplate = {
    metadata: {
        name: 'not'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/not')
    },
    code: {
        activation: `context.set(0, !context.get(0))`
    },
    info: ['https://en.wikipedia.org/wiki/Inverter_(logic_gate)']
}

export default notTemplate
