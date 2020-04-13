import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'

/**
 * The template of the rgbLight gate
 */
const rgbLightTemplate: PartialTemplate = {
    metadata: {
        name: 'rgb light'
    },
    material: {
        fill: '#1C1C1C',
        colors: {
            1: '#00f',
            2: `#0f0`,
            3: `#0ff`,
            4: `#f00`,
            5: `#f0f`,
            6: `#ff0`,
            7: `#fff`
        }
    },
    code: {
        activation: `
            const get = (index) => context.get(index)
            
            const colors = Array.from({ length: 3 }, (_, index) => {
                const bits = get(index)
                const max = 2 ** bits.length - 1
                return 256 * parseInt(bits, 2) / max
            })

            if (colors.reduce((curr, acc) => acc + curr, 0) === 0){
                context.color(context.colors.main)
            }

            else {
                context.color(\`rgb(\${colors.join(",")})\`)
            }
        `
    },
    integration: {
        output: true
    },
    info: ['https://en.wikipedia.org/wiki/Incandescent_light_bulb'],
    pins: {
        outputs: {
            count: 0
        },
        inputs: {
            count: 3
        }
    },
    category: categories.advancedIo
}

export default rgbLightTemplate
