import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the button gate
 */
const buttonTemplate: PartialTemplate = {
    metadata: {
        name: 'button'
    },
    material: {
        fill: '#D32F2E',
        stroke: {
            normal: '#AB8C31',
            active: '#7EF813'
        },
        colors: {
            pressed: '#7D1313'
        }
    },
    code: {
        onClick: `
            const active = context.getProperty('active')
            context.setProperty('active',!active)

            context.update()
        `,
        activation: `
            const state = context.getProperty('active')

            context.set(0, state)    
            context.color(!state ? context.colors.main : context.colors.pressed)
        `
    },
    pins: {
        inputs: {
            count: 0
        }
    },
    integration: {
        input: true
    },
    info: ['https://en.wikipedia.org/wiki/Push-button'],
    properties: {
        enabled: true,
        data: [
            {
                base: false,
                name: 'active',
                type: 'boolean',
                needsUpdate: true
            }
        ]
    }
}

export default buttonTemplate
