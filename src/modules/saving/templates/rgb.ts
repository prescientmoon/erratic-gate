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
            const color = (context.get(0) << 2) + (context.get(1) << 1) + context.get(2)

            if (color === 0){
                context.color(context.colors.main)
            }

            else{
                context.color(context.colors[color])
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
