import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'

/**
 * The template of the increment gate
 */
const incrementorTemplate: PartialTemplate = {
    metadata: {
        name: 'incrementor'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/incrementor.svg')
    },
    code: {
        activation: `
            const a = context.getBinary(0)

            context.setBinary(0, a + 1)`
    },
    info: [
        'https://algassert.com/circuits/2015/06/12/Constructing-Large-Increment-Gates.html'
    ],
    category: categories.math
}

export default incrementorTemplate
