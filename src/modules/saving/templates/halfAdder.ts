import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'
import { adderActivation } from '../helpers/adderActivation'

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
        activation: adderActivation(false)
    },
    pins: {
        inputs: {
            count: 2
        },
        outputs: {
            count: 2
        }
    },
    category: categories.math,
    info: [
        'https://www.elprocus.com/half-adder-and-full-adder/',
        'https://en.wikipedia.org/wiki/Adder_(electronics)',
        'http://isweb.redwoods.edu/instruct/calderwoodd/diglogic/half-add.htm'
    ]
}

export default halfAdderTemplate
