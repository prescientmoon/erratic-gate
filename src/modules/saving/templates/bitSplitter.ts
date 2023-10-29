import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'

/**
 * The template of the bitSplitter gate
 */
const bitSplitterTemplate: PartialTemplate = {
    metadata: {
        name: 'bit splitter'
    },
    code: {
        activation: `
            const a = context.get(0)
            const l = a.length + (a.length % 2 === 1)
            const b = context.toLength(a, l)
            const half = b.length / 2

            const chunks = [
                b.substr(0, half),
                b.substr(half)
            ]

            for (let index = 0; index < 2; index++ ) {
                context.set(index, chunks[1 - index])
            }
        `
    },
    material: {
        type: 'image',
        fill: require('../../../assets/splitter.svg')
    },
    category: categories.compressing,
    pins: {
        outputs: {
            count: 2
        }
    }
}

export default bitSplitterTemplate
