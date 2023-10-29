import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'
import { _4BitScale } from '../data/4BitScale'

/**
 * The template of the _4bitEncoder gate
 */
const _4bitEncoderTemplate: PartialTemplate = {
    metadata: {
        name: `4 bit encoder`
    },
    category: categories.compressing,
    code: {
        activation: `
            const get = (num) => {
                const value = context.get(num)
                return value[value.length - 1]
            }

            const total = get(3) + get(2) + get(1) + get(0)

            context.set(0, total)
        `
    },
    material: {
        type: 'image',
        fill: require('../../../assets/4encoder.svg')
    },
    shape: {
        scale: _4BitScale
    },
    pins: {
        inputs: {
            count: 4
        }
    }
}

export default _4bitEncoderTemplate
