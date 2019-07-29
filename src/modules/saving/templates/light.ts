import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the light gate
 */
const lightTemplate: PartialTemplate = {
    metadata: {
        name: 'light bulb'
    },
    shape: {
        radius: 50
    },
    material: {
        fill: '#1C1C1C',
        stroke: {
            normal: '#3C3C3C'
        },
        colors: {
            active: '#C6FF00'
        }
    },
    code: {
        activation: `
            const { main, active } = context.colors

            context.color(context.get(0) ? active : main)
        `
    },
    integration: {
        output: true
    },
    info: ['https://en.wikipedia.org/wiki/Incandescent_light_bulb'],
    pins: {
        outputs: {
            count: 0
        }
    }
}

export default lightTemplate
