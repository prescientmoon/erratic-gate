import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the xnor gate
 */
const xnorTemplate: PartialTemplate = {
    metadata: {
        name: 'xnor'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/xnor')
    },
    code: {
        activation: `
        const a = context.get(0)
        const b = context.get(1)
        const c = (a && b) || !(a || b)
        
        context.set(0, c)`
    },
    info: ['https://en.wikipedia.org/wiki/XNOR_gate'],
    pins: {
        inputs: {
            count: 2
        }
    }
}

export default xnorTemplate
