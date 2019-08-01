import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'
import { adderActivation } from '../helpers/adderActivation'

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
        activation: adderActivation(true)
    },
    pins: {
        inputs: {
            count: 3
        },
        outputs: {
            count: 2
        }
    },
    category: categories.math,
    info: [
        'https://www.elprocus.com/half-adder-and-full-adder/',
        'https://en.wikipedia.org/wiki/Adder_(electronics)',
        'https://www.geeksforgeeks.org/full-adder-digital-electronics/'
    ]
}

export default fullAdderTemplate
