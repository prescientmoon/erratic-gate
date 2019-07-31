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
    category: categories.math
}

export default fullAdderTemplate
