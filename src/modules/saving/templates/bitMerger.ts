import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'

/**
 * The template of the bitMerger gate
 */
const bitMergerTemplate: PartialTemplate = {
    metadata: {
        name: 'bit merger'
    },
    pins: {
        inputs: {
            count: 2
        }
    },
    code: {
        activation: `
            const a = context.get(0)
            const b = context.get(1)

            context.set(0, b + a)
        `
    },
    category: categories.compressing,
    material: {
        type: 'image',
        fill: require('../../../assets/merger')
    }
}

export default bitMergerTemplate
