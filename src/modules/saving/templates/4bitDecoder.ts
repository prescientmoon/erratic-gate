import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'
import { _4BitScale } from '../data/4BitScale'

/**
 * The template of the _4bitDecoder gate
 */
const _4bitDecoderTemplate: PartialTemplate = {
    metadata: {
        name: `4 bit decoder`
    },
    category: categories.compressing,
    code: {
        activation: `
            const input = context.get(0)

            const set = (index) => {
                context.set(3 - index, input[index] || '0')
            }

            for (const index of [0,1,2,3]){
                set(index)
            }
        `
    },
    material: {
        type: 'image',
        fill: require('../../../assets/4decoder')
    },
    shape: {
        scale: _4BitScale
    },
    pins: {
        outputs: {
            count: 4
        }
    }
}

export default _4bitDecoderTemplate
